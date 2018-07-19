// NOTE: You can't just copy and paste this whole file into a debugger to run it, as some message are sent async

/* eslint-disable */
var mp3Base64 = "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";

imgBase64 = "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAECElEQVR4Xu2ZO44TURREa0SAWBASKST8xCdDQMAq+OyAzw4ISfmLDBASISERi2ADEICEWrKlkYWny6+77fuqalJfz0zVOXNfv/ER8mXdwJF1+oRHBDCXIAJEAPMGzONnA0QA8wbM42cDRADzBszjZwNEAPMGzONnA0QA8wbM42cDRADzBszjZwNEAPMGzONnA0QA8wbM42cDRADzBszjZwNEAPMGzONnA0QA8wbM42cDRADzBszjZwNEAPMGzONnA0QA8wbM42cDRADzBszjZwNEAPMGzONnA0QA8wbM42cDRADzBszjZwNEAPMGzONnA0QA8waWjX8OwHcAv5f9Me3fPRugvbuxd14C8B7AVwA3q0oQAcYwtr2+hn969faPVSWIAG2AT3rXJvz17CcAN6ptgggwrwDb4JeVIALMJ8AY/JISRIB5BGDhr3/aZwDXKxwHEWC6AJcBvAOwfuBjvuNfABcBfGGGl5yJANPabYV/B8DLaT96nndHgPYeu4c/RI8AbQJIwO9FgDMAfrVxWuRdMvB7EOA+gHsALgD4uQjO3b6pFPzqAjwA8HTF5weA8weWQA5+ZQGOw1//jR5SAkn4VQV4CODJls18CAmuAHjbcM8vc9U76ZSrdgt4BODxyLG8Twla4P8BcLfKPX/sEaeSAAz8fR4H8vArHQHXAHwYs3Xj9SU3gQX8SgKcAvBitTp38WAJCWzgVxJg+F0qSGAFv5oAh5bADn5FAQ4lwVUAb3a86nX1tL/tXK10Czj+O+7zOLCFX3UDrEXYhwTW8KsLsPRx0Ap/+A/fq12uKpVnqx4BSx8Hgb9quAcB5t4EgX/sz6sXAeaSIPA3zqOeBJgqwTMAzxuuelJn/ubzSG8CTJFg12ex4Z4vDb+HW8A2aK1XRFYCC/g9C7DkJrCB37sAS0hgBV9BgDklGODfBvCaPScU5np8CPxf71OfCSzhq2yAqZ8d2MJXE6DlOLCGryjALhLYw1cVgJEg8Dv7MKjlgXvbg2Hgd/ph0BwSBH7nHwZNkeCW4z1/rDCV/wOM5RyOg7MAvo0Nur3uIoAbVzpvBKCr0hyMAJpc6VQRgK5KczACaHKlU0UAuirNwQigyZVOFQHoqjQHI4AmVzpVBKCr0hyMAJpc6VQRgK5KczACaHKlU0UAuirNwQigyZVOFQHoqjQHI4AmVzpVBKCr0hyMAJpc6VQRgK5KczACaHKlU0UAuirNwQigyZVOFQHoqjQHI4AmVzpVBKCr0hyMAJpc6VQRgK5KczACaHKlU0UAuirNwQigyZVOFQHoqjQHI4AmVzpVBKCr0hyMAJpc6VQRgK5KczACaHKlU0UAuirNwQigyZVOFQHoqjQHI4AmVzpVBKCr0hz8BzIXtYE3VcPnAAAAAElFTkSuQmCC";


  AudioModel = Layer.Core.Client.getMessageTypeModelClass('AudioModel');
  TextModel = Layer.Core.Client.getMessageTypeModelClass('TextModel');

  new TextModel({text: "Uses sourceUrl, no metadata; mp3"}).send({ conversation: $("layer-conversation-view").conversation });
  new AudioModel({
    sourceUrl: "http://www.mpgedit.org/mpgedit/testdata/mpeg1/layer3/compl.mp3",
  }).send({ conversation: $("layer-conversation-view").conversation })

  new TextModel({text: "Uses sourceUrl, no poster; mp3"}).send({ conversation: $("layer-conversation-view").conversation });
  new AudioModel({
    sourceUrl: "http://www.mpgedit.org/mpgedit/testdata/mpeg1/layer3/compl.mp3",
    title: "Sample mp3",
    artist: "Artist Foo",
    mimeType: "audio/mpeg",
    duration: 12345678,
  }).send({ conversation: $("layer-conversation-view").conversation })

  new TextModel({text: "Uses sourceUrl, previewUrl, previewWidth and height; mp3"}).send({ conversation: $("layer-conversation-view").conversation });
  new AudioModel({
    sourceUrl: "http://www.mpgedit.org/mpgedit/testdata/mpeg1/layer3/compl.mp3",
    previewUrl: "https://is3-ssl.mzstatic.com/image/thumb/Music6/v4/be/44/89/be4489a2-4562-a8c9-97dc-500ea98081cb/audiomachine17.jpg/600x600bf.jpg",
    previewWidth: 600,
    previewHeight: 600,
    title: "Sample mp3",
    artist: "Artist Foo",
    mimeType: "audio/mpeg",
    duration: 12345678,
  }).send({ conversation: $("layer-conversation-view").conversation })

  new TextModel({text: "Invalid sourceUrl, should show broken play button"}).send({ conversation: $("layer-conversation-view").conversation });
  AudioModel = Layer.Core.Client.getMessageTypeModelClass('AudioModel');
  new AudioModel({
    sourceUrl: "http://layer.com",
    title: "Sample mp3",
    artist: "Artist Foo",
    mimeType: "audio/mpeg",
    duration: 12345678,
  }).send({ conversation: $("layer-conversation-view").conversation })


  new TextModel({text: "Uses source, no poster; mp3"}).send({ conversation: $("layer-conversation-view").conversation });
  new AudioModel({
    source: Layer.Utils.base64ToBlob(mp3Base64, 'audio/mp3'),
    mimeType: 'audio/mp3',
    artist: "Artist Foo",
    size: Layer.Utils.base64ToBlob(mp3Base64, 'audio/mp3').size,
    title: 'Sample mp3',
  }).send({ conversation: $("layer-conversation-view").conversation });

  new TextModel({text: "Uses source, preview with previewWidth/Height; mp3"}).send({ conversation: $("layer-conversation-view").conversation });
  new AudioModel({
    source: Layer.Utils.base64ToBlob(mp3Base64, 'audio/mp3'),
    preview: Layer.Utils.base64ToBlob(imgBase64, 'image/png'),
    mimeType: 'audio/mp3',
    artist: "Artist Foo",
    size: Layer.Utils.base64ToBlob(mp3Base64, 'audio/mp3').size,
    title: 'Sample MP#',
  }).send({ conversation: $("layer-conversation-view").conversation });

  new TextModel({text: "Uses preview image with previewWidth but no previewHeight"}).send({ conversation: $("layer-conversation-view").conversation });
  new AudioModel({
    sourceUrl: "http://www.mpgedit.org/mpgedit/testdata/mpeg1/layer3/compl.mp3",
    previewUrl: "https://is3-ssl.mzstatic.com/image/thumb/Music6/v4/be/44/89/be4489a2-4562-a8c9-97dc-500ea98081cb/audiomachine17.jpg/600x600bf.jpg",
    previewWidth: 600,
    title: "Sample mp3",
    artist: "Artist Foo",
    mimeType: "audio/mpeg",
    duration: 12345678,
  }).send({ conversation: $("layer-conversation-view").conversation })

  new TextModel({text: "Uses preview image with previewHeight but no previewWidth"}).send({ conversation: $("layer-conversation-view").conversation });
  new AudioModel({
    sourceUrl: "http://www.mpgedit.org/mpgedit/testdata/mpeg1/layer3/compl.mp3",
    previewUrl: "https://is3-ssl.mzstatic.com/image/thumb/Music6/v4/be/44/89/be4489a2-4562-a8c9-97dc-500ea98081cb/audiomachine17.jpg/600x600bf.jpg",
    previewHeight: 600,
    title: "Sample mp3",
    artist: "Artist Foo",
    mimeType: "audio/mpeg",
    duration: 12345678,
  }).send({ conversation: $("layer-conversation-view").conversation })

  new TextModel({text: "Uses preview image with no previewWidth nor previewHeight"}).send({ conversation: $("layer-conversation-view").conversation });
  new AudioModel({
    sourceUrl: "http://www.mpgedit.org/mpgedit/testdata/mpeg1/layer3/compl.mp3",
    previewUrl: "https://is3-ssl.mzstatic.com/image/thumb/Music6/v4/be/44/89/be4489a2-4562-a8c9-97dc-500ea98081cb/audiomachine17.jpg/600x600bf.jpg",
    title: "Sample mp3",
    artist: "Artist Foo",
    mimeType: "audio/mpeg",
    duration: 12345678,
  }).send({ conversation: $("layer-conversation-view").conversation })

  new TextModel({text: "Uses preview image that is much wider than tall"}).send({ conversation: $("layer-conversation-view").conversation });
  var wideSvg = "PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjEwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgPHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSIxMDAiIHN0eWxlPSJmaWxsOnJnYigwLDAsMjU1KTtzdHJva2Utd2lkdGg6MztzdHJva2U6cmdiKDAsMCwwKSIgLz4NCiAgU29ycnksIHlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGlubGluZSBTVkcuICANCjwvc3ZnPg==";
  new AudioModel({
    sourceUrl: "http://www.mpgedit.org/mpgedit/testdata/mpeg1/layer3/compl.mp3",
    preview: Layer.Utils.base64ToBlob(wideSvg, 'image/svg+xml'),
    previewWidth: 600,
    previewHeight: 100,
    title: "Sample mp3",
    artist: "Artist Foo",
    mimeType: "audio/mpeg",
    duration: 12345678,
  }).send({ conversation: $("layer-conversation-view").conversation })

  new TextModel({text: "Uses preview image that is much taller than wide"}).send({ conversation: $("layer-conversation-view").conversation });
  var tallSvg = "PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjYwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSI2MDAiIHN0eWxlPSJmaWxsOnJnYigwLDAsMjU1KTtzdHJva2Utd2lkdGg6MztzdHJva2U6cmdiKDAsMCwwKSIgLz4NCiAgU29ycnksIHlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGlubGluZSBTVkcuICANCjwvc3ZnPg==";
  new AudioModel({
    sourceUrl: "http://www.mpgedit.org/mpgedit/testdata/mpeg1/layer3/compl.mp3",
    preview: Layer.Utils.base64ToBlob(tallSvg, 'image/svg+xml'),
    previewWidth: 100,
    previewHeight: 600,
    title: "Sample mp3",
    artist: "Artist Foo",
    mimeType: "audio/mpeg",
    duration: 12345678,
  }).send({ conversation: $("layer-conversation-view").conversation })

  new TextModel({text: "Renders source_url as compl instead of title if no title"}).send({ conversation: $("layer-conversation-view").conversation });
  new AudioModel({
    sourceUrl: "http://www.mpgedit.org/mpgedit/testdata/mpeg1/layer3/compl.mp3",
    artist: "Artist Foo",
    mimeType: "audio/mpeg",
    duration: 12345678,
  }).send({ conversation: $("layer-conversation-view").conversation })


  new TextModel({text: "Renders 'Audio Message' instead of title if no title and no source_url"}).send({ conversation: $("layer-conversation-view").conversation });
  new AudioModel({
    source: Layer.Utils.base64ToBlob(mp3Base64, 'audio/mp3'),
    artist: "Artist Foo",
    mimeType: "audio/mpeg",
    duration: 12345678,
  }).send({ conversation: $("layer-conversation-view").conversation })

  new TextModel({text: "Renders Artist over album and genre"}).send({ conversation: $("layer-conversation-view").conversation });
  new AudioModel({
    sourceUrl: "http://www.mpgedit.org/mpgedit/testdata/mpeg1/layer3/compl.mp3",
    title: "Sample mp3",
    artist: "Artist Foo",
    album: "Album Foo",
    genre: "Foo Mastery",
    mimeType: "audio/mpeg",
    duration: 12345678,
  }).send({ conversation: $("layer-conversation-view").conversation })

  new TextModel({text: "Renders Artist and album but not genre if no duration or size"}).send({ conversation: $("layer-conversation-view").conversation });
  new AudioModel({
    sourceUrl: "http://www.mpgedit.org/mpgedit/testdata/mpeg1/layer3/compl.mp3",
    title: "Sample mp3",
    artist: "Artist Foo",
    album: "Album Foo",
    genre: "Foo Mastery",
    mimeType: "audio/mpeg",
  }).send({ conversation: $("layer-conversation-view").conversation })

  new TextModel({text: "Renders Album instead of artist if no artist"}).send({ conversation: $("layer-conversation-view").conversation });
  new AudioModel({
    sourceUrl: "http://www.mpgedit.org/mpgedit/testdata/mpeg1/layer3/compl.mp3",
    title: "Sample mp3",
    album: "Album Foo",
    genre: "Foo Mastery",
    mimeType: "audio/mpeg",
    duration: 12345678,
  }).send({ conversation: $("layer-conversation-view").conversation })


  new TextModel({text: "Renders Genre instead of artist if no artist"}).send({ conversation: $("layer-conversation-view").conversation });
  new AudioModel({
    sourceUrl: "http://www.mpgedit.org/mpgedit/testdata/mpeg1/layer3/compl.mp3",
    title: "Sample mp3",
    genre: "Foo Mastery",
    mimeType: "audio/mpeg",
    duration: 12345678,
  }).send({ conversation: $("layer-conversation-view").conversation })

  new TextModel({text: "Renders duration rather than size"}).send({ conversation: $("layer-conversation-view").conversation });
  new AudioModel({
    sourceUrl: "http://www.mpgedit.org/mpgedit/testdata/mpeg1/layer3/compl.mp3",
    title: "Sample mp3",
    artist: "Artist Foo",
    album: "Album Foo",
    genre: "Foo Mastery",
    mimeType: "audio/mpeg",
    size: 12345,
    duration: 12345678,
  }).send({ conversation: $("layer-conversation-view").conversation })

  new TextModel({text: "Renders size instead of duration if no duration"}).send({ conversation: $("layer-conversation-view").conversation });
  new AudioModel({
    sourceUrl: "http://www.mpgedit.org/mpgedit/testdata/mpeg1/layer3/compl.mp3",
    title: "Sample mp3",
    artist: "Artist Foo",
    album: "Album Foo",
    genre: "Foo Mastery",
    mimeType: "audio/mpeg",
    size: 12345,
  }).send({ conversation: $("layer-conversation-view").conversation })

  new TextModel({text: "Renders size instead of artist/genre/album"}).send({ conversation: $("layer-conversation-view").conversation });
  new AudioModel({
    sourceUrl: "http://www.mpgedit.org/mpgedit/testdata/mpeg1/layer3/compl.mp3",
    title: "Sample mp3",
    mimeType: "audio/mpeg",
    size: 12345,
  }).send({ conversation: $("layer-conversation-view").conversation })

  new TextModel({text: "Renders duration and size instead of artist/genre/album"}).send({ conversation: $("layer-conversation-view").conversation });
  new AudioModel({
    sourceUrl: "http://www.mpgedit.org/mpgedit/testdata/mpeg1/layer3/compl.mp3",
    title: "Sample mp3",
    mimeType: "audio/mpeg",
    duration: 12345678,
    size: 12345,
  }).send({ conversation: $("layer-conversation-view").conversation })

  new TextModel({text: "Used for the docs.layer.com example"}).send({ conversation: $("layer-conversation-view").conversation });
  AudioModel = Layer.Core.Client.getMessageTypeModelClass('AudioModel');  new AudioModel({
    sourceUrl: "http://www.mpgedit.org/mpgedit/testdata/mpeg1/layer3/compl.mp3",
    previewUrl: "https://is3-ssl.mzstatic.com/image/thumb/Music6/v4/be/44/89/be4489a2-4562-a8c9-97dc-500ea98081cb/audiomachine17.jpg/600x600bf.jpg",
    title: "Land of Ice and Fire",
    artist: "Audiomachine",
    mimeType: "audio/mpeg",
    duration: 60*3+9,previewWidth: 600, previewHeight: 600
  }).send({ conversation: $("layer-conversation-view").conversation })


  AudioModel = Layer.Core.Client.getMessageTypeModelClass('AudioModel');
  TextModel = Layer.Core.Client.getMessageTypeModelClass('TextModel');
  new TextModel({text: "source and preview with no title"}).send({ conversation: $("layer-conversation-view").conversation });
  new AudioModel({
    source: Layer.Utils.base64ToBlob(mp3Base64, 'audio/mp3'),
    previewUrl: "https://is3-ssl.mzstatic.com/image/thumb/Music6/v4/be/44/89/be4489a2-4562-a8c9-97dc-500ea98081cb/audiomachine17.jpg/600x600bf.jpg",
    mimeType: 'audio/mp3',
    artist: "Artist Foo",
    size: Layer.Utils.base64ToBlob(mp3Base64, 'audio/mp3').size,
  }).send({ conversation: $("layer-conversation-view").conversation });

  new TextModel({text: "source and preview with no metadata"}).send({ conversation: $("layer-conversation-view").conversation });
  new AudioModel({
    source: Layer.Utils.base64ToBlob(mp3Base64, 'audio/mp3'),
    previewUrl: "https://is3-ssl.mzstatic.com/image/thumb/Music6/v4/be/44/89/be4489a2-4562-a8c9-97dc-500ea98081cb/audiomachine17.jpg/600x600bf.jpg",
  }).
  generateMessage($("layer-conversation-view").conversation, function(message) {
    message.findPart().body = JSON.stringify({width: 452, height: 256});
    message.send();
  });


CarouselModel = Layer.client.getMessageTypeModelClassForMimeType('application/vnd.layer.carousel+json');
TextModel = Layer.client.getMessageTypeModelClassForMimeType('application/vnd.layer.text+json');
AudioModel = Layer.Core.Client.getMessageTypeModelClass('AudioModel');

new TextModel({text: "Carousel of Audio"}).send({ conversation: $("layer-conversation-view").conversation });

new CarouselModel({
  items: [
    new AudioModel({
      source: Layer.Utils.base64ToBlob(mp3Base64, 'audio/mp3'),
      previewUrl: "https://is3-ssl.mzstatic.com/image/thumb/Music6/v4/be/44/89/be4489a2-4562-a8c9-97dc-500ea98081cb/audiomachine17.jpg/600x600bf.jpg",
      title: "Land of Ice and Fire",
      artist: "Audiomachine",
      mimeType: "audio/mpeg",
      duration: 60*3+9,previewWidth: 600, previewHeight: 600
    }),
    new AudioModel({
      source: Layer.Utils.base64ToBlob(mp3Base64, 'audio/mp3'),
      previewUrl: "https://is3-ssl.mzstatic.com/image/thumb/Music6/v4/be/44/89/be4489a2-4562-a8c9-97dc-500ea98081cb/audiomachine17.jpg/600x600bf.jpg",
      title: "Land of Ice and Fire",
      artist: "Audiomachine",
      mimeType: "audio/mpeg",
      duration: 60*3+9,previewWidth: 600, previewHeight: 600
    }),
    new AudioModel({
      source: Layer.Utils.base64ToBlob(mp3Base64, 'audio/mp3'),
      previewUrl: "https://is3-ssl.mzstatic.com/image/thumb/Music6/v4/be/44/89/be4489a2-4562-a8c9-97dc-500ea98081cb/audiomachine17.jpg/600x600bf.jpg",
      title: "Land of Ice and Fire",
      artist: "Audiomachine",
      mimeType: "audio/mpeg",
      duration: 60*3+9,previewWidth: 600, previewHeight: 600
    })
  ]
}).send({ conversation: $("layer-conversation-view").conversation });

ButtonModel = Layer.Core.Client.getMessageTypeModelClass('ButtonsModel')
TextModel = Layer.client.getMessageTypeModelClassForMimeType('application/vnd.layer.text+json');
AudioModel = Layer.Core.Client.getMessageTypeModelClass('AudioModel');

new TextModel({text: "Button Message with Audio"}).send({ conversation: $("layer-conversation-view").conversation });

model = new ButtonModel({
  buttons: [
    {"type": "action", "text": "Kill Arthur", "event": "kill-arthur"}
  ],
  contentModel: new AudioModel({
    source: Layer.Utils.base64ToBlob(mp3Base64, 'audio/mp3'),
    previewUrl: "https://is3-ssl.mzstatic.com/image/thumb/Music6/v4/be/44/89/be4489a2-4562-a8c9-97dc-500ea98081cb/audiomachine17.jpg/600x600bf.jpg",
    title: "Land of Ice and Fire",
    artist: "Audiomachine",
    mimeType: "audio/mpeg",
    duration: 60*3+9,previewWidth: 600, previewHeight: 600
  })
});
model.send({ conversation: $("layer-conversation-view").conversation });

CarouselModel = Layer.client.getMessageTypeModelClassForMimeType('application/vnd.layer.carousel+json');
TextModel = Layer.client.getMessageTypeModelClassForMimeType('application/vnd.layer.text+json');
AudioModel = Layer.Core.Client.getMessageTypeModelClass('AudioModel');
ButtonModel = Layer.Core.Client.getMessageTypeModelClass('ButtonsModel')

new TextModel({text: "Carousel of Audio Buttons"}).send({ conversation: $("layer-conversation-view").conversation });

new CarouselModel({
  items: [
    new ButtonModel({
      buttons: [
        {"type": "action", "text": "Kill Arthur", "event": "kill-arthur"}
      ],
      contentModel: new AudioModel({
        source: Layer.Utils.base64ToBlob(mp3Base64, 'audio/mp3'),
        previewUrl: "https://is3-ssl.mzstatic.com/image/thumb/Music6/v4/be/44/89/be4489a2-4562-a8c9-97dc-500ea98081cb/audiomachine17.jpg/600x600bf.jpg",
        title: "Land of Ice and Fire",
        artist: "Audiomachine",
        mimeType: "audio/mpeg",
        duration: 60*3+9,previewWidth: 600, previewHeight: 600
      })
    }),
    new ButtonModel({
      buttons: [
        {"type": "action", "text": "Kill Arthur", "event": "kill-arthur"}
      ],
      contentModel: new AudioModel({
        source: Layer.Utils.base64ToBlob(mp3Base64, 'audio/mp3'),
        previewUrl: "https://is3-ssl.mzstatic.com/image/thumb/Music6/v4/be/44/89/be4489a2-4562-a8c9-97dc-500ea98081cb/audiomachine17.jpg/600x600bf.jpg",
        title: "Land of Ice and Fire",
        artist: "Audiomachine",
        mimeType: "audio/mpeg",
        duration: 60*3+9,previewWidth: 600, previewHeight: 600
      })
    }),
    new ButtonModel({
      buttons: [
        {"type": "action", "text": "Kill Arthur", "event": "kill-arthur"}
      ],
      contentModel: new AudioModel({
        source: Layer.Utils.base64ToBlob(mp3Base64, 'audio/mp3'),
        previewUrl: "https://is3-ssl.mzstatic.com/image/thumb/Music6/v4/be/44/89/be4489a2-4562-a8c9-97dc-500ea98081cb/audiomachine17.jpg/600x600bf.jpg",
        title: "Land of Ice and Fire",
        artist: "Audiomachine",
        mimeType: "audio/mpeg",
        duration: 60*3+9,previewWidth: 600, previewHeight: 600
      })
    })
  ]
}).send({ conversation: $("layer-conversation-view").conversation });