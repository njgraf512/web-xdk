/**
 * Floating modal dialog for containing arbitrary content.
 *
 * ```
 * var dialog = document.createElement('layer-dialog');
 * dialog.replaceableContent = {
 *   content: arbitraryDomNodes
 * };
 * dialog.isCloseButtonShowing = true;
 *
 * document.body.appendChild(dialog);
 * ```
 *
 * This dialog is not designed to hide/show/hide/show.  Its either present in the DOM structure in which case
 * its visible, or its been removed from the DOM structure (done and gone).
 *
 * Quick way to dismiss the dialog:
 *
 * ```
 * dialog.destroy();
 * ```
 *
 * @class Layer.UI.components.Dialog
 * @extends Layer.UI.Component
 * @mixin Layer.UI.mixins.Clickable
 */
import { registerComponent } from './component';
import './layer-title-bar';
import Clickable from '../mixins/clickable';
import { generateUUID } from '../../utils';

registerComponent('layer-dialog', {
  mixins: [Clickable],
  template: `
    <div class="layer-dialog-inner" layer-id="inner">
      <layer-title-bar layer-id="titleBar">
        <div layer-replaceable-name="buttons">
          <div layer-id='close' class="layer-title-close-button">&times;</div>
        </div>
      </layer-title-bar>
      <layer-replaceable-content name='content' layer-id='content' class='layer-dialog-content-container'>
      </layer-replaceable-content>
    </div>
  `,
  style: `
    layer-dialog {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    layer-dialog .layer-dialog-inner {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: stretch;
    }

    layer-dialog:not(.layer-show-close-button) .layer-dialog-title-close-button {
      display: none;
    }
    layer-dialog .layer-dialog-content-container {
      flex-grow: 1;
      height: 100px; /* Flexbox workaround */
      display: flex;
      flex-direction: column;
    }
    layer-dialog .layer-dialog-content-container > * {
      flex-grow: 1;
    }
    layer-dialog .layer-dialog-content {
      width: 100%;
      max-width: 100%;
    }
    layer-dialog > .layer-dialog-inner > layer-title-bar {
      display: none;
    }
    layer-dialog.layer-dialog-titlebar-showing > .layer-dialog-inner > layer-title-bar {
      display: flex;
      flex-direction: row;
      box-sizing: border-box;
      width: 100%;
    }
  `,
  properties: {
    /**
     * Does this component list for popstate events and use `history.pushState()`?
     *
     * Use of this may conflict with your app's own manipulations of these... however,
     * when the user hits the back button on a mobile device, its nice to have it dismiss this dialog.
     *
     * TODO: User clicking back AFTER this dialog is dismissed will have at least one no-op back click
     * this should be fixed.
     *
     * @property {Boolean} [managePopState=true]
     */
    managePopState: {
      type: Boolean,
      value: true,
    },

    /**
     * Title for the titlebar; comes from `this.properties.ui.getTitle()`
     *
     * @property {String} title
     */
    title: {
      set(title) {
        this.nodes.title.innerHTML = title;
        this._updateTitlebarShowing();
      },
    },

    /**
     * Icon for the titlebar; comes from `this.properties.ui.getIconClass()`
     *
     * @property {String} icon
     */
    icon: {
      value: '',
      set(icon, oldIcon) {
        if (oldIcon) this.nodes.icon.classList.remove(oldIcon);
        if (icon) this.nodes.icon.classList.add(icon);
        this.toggleClass('layer-title-icon-empty', !(icon));
        this._updateTitlebarShowing();
      },
    },

    /**
     * Show a close button in the titlebar to close the dialog?:
     *
     * @property {Boolean} [isCloseButtonShowing=false]
     */
    isCloseButtonShowing: {
      value: false,
      set(value) {
        this.toggleClass('layer-show-close-button', value);
        this._updateTitlebarShowing();
      },
    },

    /**
     * Shortcut for reading the dialog's content; use Replaceable Content for
     * setting the the content.
     *
     * @readonly
     * @property {HTMLElment} content
     */
    content: {},
  },
  methods: {
    onCreate() {
      // Read in its layer-id nodes such as the close button
      this.nodes.titleBar._onAfterCreate();

      // Last `true` argument prevents `evt.preventDefault()` from being called
      // on touch events that occur within the dialog
      this.addEventListener('layer-container-done', this.destroy.bind(this));
      this.addClickHandler('dialog-click', this, this._onClick.bind(this), true);
      this.addEventListener('touchmove', this.onTouchMove.bind(this));
      this.properties.boundPopStateListener = this._popStateListener.bind(this);
      if (!this.id) this.id = generateUUID();
    },

    // Lifecycle method
    onAfterCreate() {
      this.addClickHandler('close-click', this.nodes.titleBar.nodes.close, this.onCloseClick.bind(this));

      // this.replaceableContent is the settings that configures what replaceable content is setup for this
      // dialog's content.  If its been setup, then its either going to be an HTMLElement that we can just use
      // as-is, or a String, which is used to insert something into this.nodes.content.firstChild
      // (so get its firstChild)
      if (this.replaceableContent.content instanceof HTMLElement) {
        this.properties.content = this.replaceableContent.content;
      } else if (this.nodes.content.firstChild.firstChild instanceof HTMLElement) {
        this.properties.content = this.nodes.content.firstChild.firstChild;
      } else {
        // The contents are probably a text node which are not something we can add/remove classes to or otherwise
        // manipulate as needed
        this.properties.content = this.nodes.content.firstChild;
      }

      // Tell the content that its content for a dialog (probably not necessary, but does simplify some CSS rules)
      if (this.properties.content) {
        this.properties.content.classList.add('layer-dialog-content');
        if (this.content.getDialogClass) {
          this.classList.add(this.content.getDialogClass());
        }
      }

      const content = this.properties.content;
      if (content.getTitle) {
        this.nodes.titleBar.title = content.getTitle();
      }

      if (content.getIconClass) {
        this.nodes.titleBar.iconClass = content.getIconClass();
      }

      // If we are managing pop state, then push our state to the history, and listen for it to be popped.
      // This allows us to support android back button to dismiss the dialog
      if (this.managePopState) {
        history.pushState({ dialog: this.id }, '');
        window.addEventListener('popstate', this.properties.boundPopStateListener);
      }

      // If our parent component is a `layer-conversation-view` then listen for its conversation change event and
      // call our onConversationClose handler.
      if (this.parentComponent && this.parentComponent.tagName === 'LAYER-CONVERSATION-VIEW') {
        const props = this.properties;
        props.onConversationClose = this.onClose.bind(this);
        props.conversationView = this.parentComponent;
        props.conversationView.addEventListener('layer-conversation-panel-change', props.onConversationClose);
      }
    },


    /**
     * Set the titlebar to show if there is something in the titlebar to be shown; else let its display be none.
     *
     * @private
     * @method _updateTitlebarShowing
     */
    _updateTitlebarShowing() {
      this.toggleClass('layer-dialog-titlebar-showing', (this.title || this.icon || this.isCloseButtonShowing));
    },

    /**
     * If the back button is clicked, close this dialog.
     *
     * @method _popStateListener
     * @private
     * @param {Event} evt
     */
    _popStateListener(evt) {
      this.destroy();
    },

    /**
     * If the user clicks on the dialog... and specifically on the dialog's background, trigger its {@link #onDialogBackgroundClick} mixin.
     *
     * @method _onClick
     * @private
     * @param {Event} evt
     */
    _onClick(evt) {
      if (evt.target === this) {
        this.onDialogBackgroundClick();
        evt.stopPropagation(); // do not propagate up to the Conversation View
      }
    },

    /**
     * Mixin Hook: When the user clicks on the Dialog's background, close the dialog.
     *
     * You can use this mixin to provide your own handling of this click.
     *
     * @method onDialogBackgroundClick
     */
    onDialogBackgroundClick() {
      this.onClose();
    },

    // Lifecycle method
    onDestroy() {
      // If managing the popState, remove event listeners, and IF our state is the current state in history, remove it.
      // Unfortunately, the app may have pushed a new state of its own, and we don't dare mess about with history in that case.
      if (this.managePopState) {
        window.removeEventListener('popstate', this.properties.boundPopStateListener);
        if (history.state && history.state.dialog && history.state.dialog === this.id) {
          history.back();
        }
      }

      // Cleanup event handlers around tracking conversation changes
      if (this.properties.onConversationClose) {
        const props = this.properties;
        props.conversationView.removeEventListener('layer-conversation-panel-change', props.onConversationClose);
        delete props.conversationView;
        delete props.onConversationClose;
      }
    },

    /**
     * Mixin Hook: When the dialog is closing, its closed by being destroyed.
     *
     * @method onClose
     */
    onClose() {
      this.destroy();
    },

    /**
     * Mixin Hook: This method is used to prevent mobile devices from shifting the dialog around the screen.
     *
     * @method onTouchMove
     * @param {Event} evt
     */
    onTouchMove(evt) {
      if (evt.target === this || evt.target === this.firstChild) evt.preventDefault();
      evt.stopPropagation();
    },

    /**
     * Mixin Hook: On clicking the close button, destroy the parent component (the dialog)
     *
     * @method onCloseClick
     */
    onCloseClick() {
      this.destroy();
    },
  },
});