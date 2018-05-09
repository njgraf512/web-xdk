/**
 * The Audio Message is used to share Audio Files.
 *
 * A basic Audio Message can be created with:
 *
 * ```
 * AudioModel = Layer.Core.Client.getMessageTypeModelClass('AudioModel')
 * model = new AudioModel({
 *    sourceUrl: "http://www.mpgedit.org/mpgedit/testdata/mpeg1/layer3/compl.mp3",
 *    title: "Out of Tunes",
 *    artist: "Bad Intonation",
 *    duration: 500,
 * });
 * model.send({ conversation });
 * ```
 *
 *
 * A File Model can also be created with a message from your local file system using the
 * {@link #source} property:
 *
 * ```
 * AudioModel = Layer.Core.Client.getMessageTypeModelClass('AudioModel')
 * model = new AudioModel({
 *    source: FileBlob,
 * });
 * model.send({ conversation });
 * ```
 *
 * ### Importing
 *
 * Not included with the standard build. Import using:
 *
 * ```
 * import '@layerhq/web-xdk/ui/messages/audio/layer-audio-message-view';
 * ```
 *
 * @class Layer.UI.messages.AudioMessageModel
 * @extends Layer.Core.MessageTypeModel
 */


import Core, { MessagePart, MessageTypeModel, Root } from '../../../core/namespace';
import { logger } from '../../../utils';

class AudioModel extends MessageTypeModel {

  /**
   * Generate the Message Parts representing this model so that the Audio Message can be sent.
   *
   * @method generateParts
   * @protected
   * @param {Function} callback
   * @param {Layer.Core.MessagePart[]} callback.parts
   */
  generateParts(callback) {
    const source = this.source;
    const preview = this.preview;
    let sourcePart;

    // Intialize metadata and source MesssgePart from the Blob
    if (source) {
      if (!this.title && source.name) this.title = source.name;
      if (!this.mimeType) this.mimeType = source.type;
      sourcePart = new MessagePart(source);
      this.size = source.size;

      // Instantiate an audio player so we can examine the audio file; call continueFn1 when done
      const tmpAudio = new Audio(sourcePart.url);
      tmpAudio.addEventListener('durationchange', () => {
        this.duration = tmpAudio.duration;
        continueFn1.bind(this)();
      });
      tmpAudio.addEventListener('error', (err) => {
        logger.error('Failed to read audio file: ', err);
        continueFn1.bind(this)();
      });
    } else {
      continueFn1.bind(this)();
    }

    // TODO: Promisify this stuff
    // If a Preview blob is provided, examine it to get our previewWidth and height, and call continueFn2 when done
    function continueFn1() {
      if (preview) {
        const img = new Image();
        img.addEventListener('load', () => {
          this.previewWidth = img.width;
          this.previewHeight = img.height;
          continueFn2.bind(this)();
        });
        img.addEventListener('error', (err) => {
          logger.error('Failed to read audio file: ', err);
          continueFn2.bind(this)();
        });
        img.src = URL.createObjectURL(preview);
      } else {
        continueFn2.bind(this)();
      }
    }

    // Create the root message part for this model and connect the sourcePart and previewPart to it
    function continueFn2() {
      if (this.isDestroyed) return;

      // Setup the MessagePart
      const body = this.initBodyWithMetadata([
        'sourceUrl', 'previewUrl', 'album', 'artist', 'duration',
        'genre', 'title', 'mimeType', 'previewWidth', 'previewHeight',
        'duration', 'size',
      ]);
      this.part = new MessagePart({
        mimeType: this.constructor.MIMEType,
        body: JSON.stringify(body),
      });

      const parts = [this.part];

      // Create the source Message Part
      if (source) {
        this.source = new MessagePart(source);
        this.addChildPart(this.source, 'source');
        this.childParts.push(this.source);
        parts.push(this.source);
      }

      if (preview) {
        this.preview = new MessagePart(preview);
        this.addChildPart(this.preview, 'preview');
        this.childParts.push(this.preview);
        parts.push(this.preview);
      }

      callback(parts);
    }
  }

  // See parent class
  parseModelPart({ payload, isEdit }) {
    super.parseModelPart({ payload, isEdit });

    // Initialize the mimeType property if available
    if (!this.mimeType && this.source) this.mimeType = this.source.mimeType;
  }

  // See parent class
  parseModelChildParts({ changes = [], isEdit = false }) {
    super.parseModelChildParts({ changes, isEdit });
    this.source = this.childParts.filter(part => part.role === 'source')[0] || null;
    this.preview = this.childParts.filter(part => part.role === 'preview')[0] || null;
    this.transcript = this.childParts.filter(part => part.role === 'transcript')[0] || null;
  }

  /**
   * Get the sourceUrl to use for fetching the Audio File.
   *
   * ```
   * var player = new Audio();
   * AudioModel.getSourceUrl(url => player.src = url);
   * ```
   *
   * @method getSourceUrl
   * @param {Function} callback
   * @param {String} callback.url
   */
  getSourceUrl(callback) {
    if (this.sourceUrl) {
      callback(this.sourceUrl);
    } else if (this.source) {
      if (this.source.url) {
        callback(this.source.url);
      } else {
        this.source.fetchStream(url => callback(url));
      }
    } else {
      callback('');
    }
  }

  /**
   * Get the preview url to use for fetching the preview image... returns '' if there is no preview image.
   *
   * ```
   * var img = document.createElement('img');
   * AudioModel.getPreviewUrl(url => img.src = url);
   * ```
   *
   * @method getPreviewUrl
   * @param {Function} callback
   * @param {String} callback.url
   */
  getPreviewUrl(callback) {
    if (this.previewUrl) {
      callback(this.previewUrl);
    } else if (this.preview) {
      if (this.preview.url) {
        callback(this.preview.url);
      } else {
        this.preview.fetchStream(url => callback(url));
      }
    } else {
      callback('');
    }
  }

  /**
   * Get the title for the Standard Message Container.
   *
   * Title is either the title property, a file name within the sourceUrl or whatever is returned by the getOneLineSummary method.
   *
   * @method getTitle
   * @returns {String}
   */
  getTitle() {
    if (this.title) {
      return this.title;
    } else if (this.sourceUrl) {
      return this.sourceUrl.replace(/.*\/(.*?)(\..*)?$/, '$1');
    } else {
      return this.getOneLineSummary(true);
    }
  }
  getDescription() {
    return this.artist || this.album || this.genre;
  }
  getFooter() {
    if (this.duration) return this.getDuration();
    if (!this.size) return '';
    return this.getSize();
  }

  /**
   * Gets the duration as a formatted string; to get just the raw number use the {@link #duration} property
   *
   * @method getDuration
   * @returns {String}
   */
  getDuration() {
    let str = '';

    let hrs = Math.floor(this.duration / 3600);
    if (!hrs) hrs = '00';
    else if (hrs < 10) hrs = '0' + hrs;
    str += hrs + ':';

    const afterHours = this.duration % 3600;
    let mins = Math.floor(afterHours / 60);
    if (!mins) mins = '00';
    else if (mins < 10) mins = '0' + mins;
    str += mins + ':';

    let secs = Math.round(afterHours % 60);
    if (!secs) secs = '00';
    else if (secs < 10) secs = '0' + secs;
    str += secs;
    return str;
  }

  /**
   * Gets the size as a formatted string; to get just the raw number use the {@link #size} property
   *
   * @method getSize
   * @returns {String}
   */
  getSize() {
    return (Math.floor(this.size / 1000)).toLocaleString() + 'K';
  }

  /**
   * Whenever any view sets the model's currentTime property, notify all other views of this change.
   *
   * currentTime is number of seconds into the playback as reported by `audioPlayer.currentTime`
   *
   * @param {Number} newValue
   * @param {Number} oldValue
   */
  __updateCurrentTime(newValue, oldValue) {
    this._triggerAsync('message-type-model:change', {
      property: 'currentTime',
      oldValue,
      newValue,
    });
  }
}

/**
 * MessagePart with the Audio File to be shared.
 *
 * Use {@link #getSourceUrl} method rather than the `source` property to access this content.
 *
 * @property {Layer.Core.MessagePart} source
 */
AudioModel.prototype.source = null;

/**
 * URL to the Audio File to be shared
 *
 * Use {@link #getSourceUrl} method rather than the `sourceUrl` property to access this content.
 *
 * @property {String} sourceUrl
 */
AudioModel.prototype.sourceUrl = '';

/**
 * MessagePart with the Preview Image to be shared.
 *
 * Use {@link #getPreviewUrl} method rather than the `preview` property to access this content.
 *
 * @property {Layer.Core.MessagePart} source
 */
AudioModel.prototype.preview = null;

/**
 * URL to the Preview Image to be shared
 *
 * Use {@link #getPreviewUrl} method rather than the `previewUrl` property to access this content.
 *
 * @property {String} previewUrl
 */
AudioModel.prototype.previewUrl = '';

/**
 * Album this sound file comes from
 *
 * @property {String} album
 */
AudioModel.prototype.album = '';

/**
 * Artist of the sound file; typically shown as the Message description.
 *
 * @property {String} artist
 */
AudioModel.prototype.artist = '';

/**
 * Genre of the sound file; typically shown as the Message description.
 *
 * @property {String} genre
 */
AudioModel.prototype.genre = '';

/**
 * Title/file-name of the file; typically shown as the Message Title.
 *
 * @property {String} title
 */
AudioModel.prototype.title = '';

/**
 * MIME Type of the file.
 *
 * @property {String} mimeType
 */
AudioModel.prototype.mimeType = '';

/**
 * If a preview image is provided, provide a width and height property
 * to get the best results (least jitter) when rendering
 *
 * @property {Number} previewWidth
 */
AudioModel.prototype.previewWidth = 0;

/**
 * If a preview image is provided, provide a width and height property
 * to get the best results (least jitter) when rendering
 *
 * @property {Number} previewHeight
 */
AudioModel.prototype.previewHeight = 0;

/**
 * Duration of the audio in the duration format in seconds
 *
 * @property {String} duration
 */
AudioModel.prototype.duration = '';

/**
 * Size of the file in bytes
 *
 * @property {Number} size
 */
AudioModel.prototype.size = null;

/**
 * This property is used by different Views to share the time they have played up to.
 *
 * @property {Number} currentTime
 */
AudioModel.prototype.currentTime = null;

/**
 * One instance of this type
 *
 * @static
 * @property {String} [LabelSingular=Audio Message]
 */
AudioModel.LabelSingular = 'Audio Message';

/**
 * One instance of this type
 *
 * @static
 * @property {String} [LabelPlural=Audio Messages]
 */
AudioModel.LabelPlural = 'Audio Messages';

/**
 * Standard concise representation of this Message Type
 *
 * @static
 * @property {String} [SummaryTemplate=]
 */
AudioModel.SummaryTemplate = '';

/**
 * The default action when selecting this Message is to trigger an `layer-show-large-message` and show Large Message for Audio
 *
 * @static
 * @property {String} [defaultAction=layer-show-large-message]
 */
AudioModel.defaultAction = 'layer-show-large-message';

/**
 * The MIME Type recognized by and used by the Audio Model.
 *
 * @static
 * @property {String} [MIMEType=application/vnd.layer.audio+json]
 */
AudioModel.MIMEType = 'application/vnd.layer.audio+json';

/**
 * The UI Component to render the Audio Model.
 *
 * @static
 * @property {String} [messageRenderer=layer-audio-message-view]
 */
AudioModel.messageRenderer = 'layer-audio-message-view';

/**
 * The UI Component to render the Large Message Audio Model.
 *
 * @static
 * @property {String} [messageRenderer=layer-audio-message-large-view]
 */
AudioModel.largeMessageRenderer = 'layer-audio-message-large-view';

// Init the class
Root.initClass.apply(AudioModel, [AudioModel, 'AudioModel']);

// Register the Message Model Class with the Client
Core.Client.registerMessageTypeModelClass(AudioModel, 'AudioModel');

module.exports = AudioModel;
