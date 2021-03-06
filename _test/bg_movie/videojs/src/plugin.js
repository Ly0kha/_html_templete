import videojs from 'video.js';
import OGVCompat from 'OGVCompat';
import OGVLoader from 'OGVLoader';
import OGVPlayer from 'OGVPlayer';
const Tech = videojs.getComponent('Tech');

/**
 * Ogvjs Media Controller - Wrapper for Ogvjs Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Tech
 * @class Ogvjs
 */
class Ogvjs extends Tech {

  constructor(options, ready) {
    super(options, ready);

    this.triggerReady();
  }

  /**
   * Dispose of Ogvjs media element
   *
   * @method dispose
   */
  dispose() {
    // Ogvjs.disposeMediaElement(this.el_);
    super.dispose();
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */
  createEl() {
    let options = this.options_;

    if (options.base) {
      OGVLoader.base = options.base;
    } else {
      throw new Error('Please specify the base for the ogv.js library');
    }

    let el = new OGVPlayer(options);

    // simulate timeupdate events, needed for subtitles
    // @todo switch this to native timeupdate event when available upstream
    this.lastTime = 0;
    el.addEventListener('framecallback', this.onFrameUpdate.bind(this));
    el.src = this.options_.source.src;
    el.className += ' vjs-tech';

    return el;
  }

  onFrameUpdate(event) {
    let timeupdateInterval = 0.25;
    let now = this.el_ ? this.el_.currentTime : this.lastTime;

    // Don't spam time updates on every frame
    if (Math.abs(now - this.lastTime) >= timeupdateInterval) {
      this.lastTime = now;
      this.trigger('timeupdate');
      this.trigger('durationchange');
    }
  }

  /**
   * Play for Ogvjs tech
   *
   * @method play
   */
  play() {
    this.el_.play();
  }

  /**
   * Pause for Ogvjs tech
   *
   * @method pause
   */
  pause() {
    this.el_.pause();
  }

  /**
   * Paused for Ogvjs tech
   *
   * @return {Boolean}
   * @method paused
   */
  paused() {
    return this.el_.paused;
  }

  /**
   * Get current time
   *
   * @return {Number}
   * @method currentTime
   */
  currentTime() {
    return this.el_.currentTime;
  }

  /**
   * Set current time
   *
   * @param {Number} seconds Current time of video
   * @method setCurrentTime
   */
  setCurrentTime(seconds) {
    try {
      this.el_.currentTime = seconds;
    } catch (e) {
      videojs.log(e, 'Video is not ready. (Video.js)');
    }
  }

  /**
   * Get duration
   *
   * @return {Number}
   * @method duration
   */
  duration() {
    return this.el_.duration || 0;
  }

  /**
   * Get a TimeRange object that represents the intersection
   * of the time ranges for which the user agent has all
   * relevant media
   *
   * @return {TimeRangeObject}
   * @method buffered
   */
  buffered() {
    return this.el_.buffered;
  }

  /**
   * Get volume level
   *
   * @return {Number}
   * @method volume
   */
  volume() {
    return this.el_.volume ? this.el_.volume : 1;
  }

  /**
   * Set volume level
   *
   * @param {Number} percentAsDecimal Volume percent as a decimal
   * @method setVolume
   */
  setVolume(percentAsDecimal) {
    if (this.el_.volume) {
      this.el_.volume = percentAsDecimal;
    }
  }

  /**
   * Get if muted
   *
   * @return {Boolean}
   * @method muted
   */
  muted() {
    return this.el_.muted ? this.el_.muted : false;
  }

  /**
   * Set muted
   *
   * @param {Boolean} If player is to be muted or note
   * @method setMuted
   */
  setMuted(muted) {
    if (this.el_.muted) {
      this.el_.muted = muted;
    }
  }

  /**
   * Get player width
   *
   * @return {Number}
   * @method width
   */
  width() {
    return this.el_.offsetWidth;
  }

  /**
   * Get player height
   *
   * @return {Number}
   * @method height
   */
  height() {
    return this.el_.offsetHeight;
  }

  /**
   * Get if there is fullscreen support
   *
   * @return {Boolean}
   * @method supportsFullScreen
   */
  supportsFullScreen() {
    if (typeof this.el_.webkitEnterFullScreen === 'function') {
      let userAgent = window.navigator.userAgent;

      // Seems to be broken in Chromium/Chrome && Safari in Leopard
      if ((/Android/).test(userAgent) || !(/Chrome|Mac OS X 10.5/).test(userAgent)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Request to enter fullscreen
   *
   * @method enterFullScreen
   */
  enterFullScreen() {
    let video = this.el_;

    if ('webkitDisplayingFullscreen' in video) {
      this.one('webkitbeginfullscreen', function() {
        this.one('webkitendfullscreen', function() {
          this.trigger('fullscreenchange', { isFullscreen: false });
        });

        this.trigger('fullscreenchange', { isFullscreen: true });
      });
    }

    if (video.paused && video.networkState <= video.HAVE_METADATA) {
      // attempt to prime the video element for programmatic access
      // this isn't necessary on the desktop but shouldn't hurt
      this.el_.play();

      // playing and pausing synchronously during the transition to fullscreen
      // can get iOS ~6.1 devices into a play/pause loop
      this.setTimeout(function() {
        video.pause();
        video.webkitEnterFullScreen();
      }, 0);
    } else {
      video.webkitEnterFullScreen();
    }
  }

  /**
   * Request to exit fullscreen
   *
   * @method exitFullScreen
   */
  exitFullScreen() {
    this.el_.webkitExitFullScreen();
  }

  /**
   * Get/set video
   *
   * @param {Object=} src Source object
   * @return {Object}
   * @method src
   */
  src(src) {
    if (typeof src === 'undefined') {
      return this.el_.src;
    }
    // Setting src through `src` instead of `setSrc` will be deprecated
    this.setSrc(src);
  }

  /**
   * Set video
   *
   * @param {Object} src Source object
   * @deprecated
   * @method setSrc
   */
  setSrc(src) {
    this.el_.src = src;
  }

  /**
   * Load media into player
   *
   * @method load
   */
  load() {
    this.el_.load();
  }

  /**
   * Get current source
   *
   * @return {Object}
   * @method currentSrc
   */
  currentSrc() {
    if (this.currentSource_) {
      return this.currentSource_.src;
    }
    return this.el_.currentSrc;
  }

  /**
   * Get poster
   *
   * @return {String}
   * @method poster
   */
  poster() {
    return this.el_.poster;
  }

  /**
   * Set poster
   *
   * @param {String} val URL to poster image
   * @method
   */
  setPoster(val) {
    this.el_.poster = val;
  }

  /**
   * Get preload attribute
   *
   * @return {String}
   * @method preload
   */
  // preload() { return this.el_.preload; }

  /**
   * Set preload attribute
   *
   * @param {String} val Value for preload attribute
   * @method setPreload
   */
  // setPreload(val) { this.el_.preload = val; }

  /**
   * Get autoplay attribute
   *
   * @return {String}
   * @method autoplay
   */
  // autoplay() { return this.el_.autoplay; }

  /**
   * Set autoplay attribute
   *
   * @param {String} val Value for preload attribute
   * @method setAutoplay
   */
  // setAutoplay(val) { this.el_.autoplay = val; }

  /**
   * Get controls attribute
   *
   * @return {String}
   * @method controls
   */
  controls() {
    return this.el_.controls;
  }

  /**
   * Set controls attribute
   *
   * @param {String} val Value for controls attribute
   * @method setControls
   */
  setControls(val) {
    this.el_.controls = !!val;
  }

  /**
   * Get loop attribute
   *
   * @return {String}
   * @method loop
   */
  // loop() { return this.el_.loop; }

  /**
   * Set loop attribute
   *
   * @param {String} val Value for loop attribute
   * @method setLoop
   */
  // setLoop(val) { this.el_.loop = val; }

  /**
   * Get error value
   *
   * @return {String}
   * @method error
   */
  error() {
    return this.el_.error;
  }

  /**
   * Get whether or not the player is in the "seeking" state
   *
   * @return {Boolean}
   * @method seeking
   */
  seeking() {
    return this.el_.seeking;
  }

  /**
   * Get a TimeRanges object that represents the
   * ranges of the media resource to which it is possible
   * for the user agent to seek.
   *
   * @return {TimeRangeObject}
   * @method seekable
   */
  seekable() {
    return this.el_.seekable;
  }

  /**
   * Get if video ended
   *
   * @return {Boolean}
   * @method ended
   */
  ended() {
    return this.el_.ended;
  }

  /**
   * Get the value of the muted content attribute
   * This attribute has no dynamic effect, it only
   * controls the default state of the element
   *
   * @return {Boolean}
   * @method defaultMuted
   */
  // defaultMuted() { return this.el_.defaultMuted; }

  /**
   * Get desired speed at which the media resource is to play
   *
   * @return {Number}
   * @method playbackRate
   */
  // playbackRate() { return this.el_.playbackRate; }

  /**
   * Returns a TimeRanges object that represents the ranges of the
   * media resource that the user agent has played.
   * @return {TimeRangeObject} the range of points on the media
   * timeline that has been reached through normal playback
   * @see https://html.spec.whatwg.org/multipage/embedded-content.html#dom-media-played
   */
  // played() { return this.el_.played; }

  /**
   * Set desired speed at which the media resource is to play
   *
   * @param {Number} val Speed at which the media resource is to play
   * @method setPlaybackRate
   */
  // setPlaybackRate(val) { this.el_.playbackRate = val; }

  /**
   * Get the current state of network activity for the element, from
   * the list below
   * NETWORK_EMPTY (numeric value 0)
   * NETWORK_IDLE (numeric value 1)
   * NETWORK_LOADING (numeric value 2)
   * NETWORK_NO_SOURCE (numeric value 3)
   *
   * @return {Number}
   * @method networkState
   */
  // networkState() { return this.el_.networkState; }

  /**
   * Get a value that expresses the current state of the element
   * with respect to rendering the current playback position, from
   * the codes in the list below
   * HAVE_NOTHING (numeric value 0)
   * HAVE_METADATA (numeric value 1)
   * HAVE_CURRENT_DATA (numeric value 2)
   * HAVE_FUTURE_DATA (numeric value 3)
   * HAVE_ENOUGH_DATA (numeric value 4)
   *
   * @return {Number}
   * @method readyState
   */
  // readyState() { return this.el_.readyState; }

  /**
   * Get width of video
   *
   * @return {Number}
   * @method videoWidth
   */
  videoWidth() {
    return this.el_.videoWidth;
  }

  /**
   * Get height of video
   *
   * @return {Number}
   * @method videoHeight
   */
  videoHeight() {
    return this.el_.videoHeight;
  }

}

/*
 * Check if Ogvjs video is supported by this browser/device
 *
 * @return {Boolean}
 */
Ogvjs.isSupported = function() {
  return OGVCompat.supported('OGVPlayer');
};

/*
   * Check if the tech can support the given source
   * @param  {Object} srcObj  The source object
   * @return {String}         'probably', 'maybe', or '' (empty string)
   */
Ogvjs.canPlaySource = function(srcObj) {
  return (srcObj.type.indexOf('/ogg') !== -1) ? 'maybe' : '';
};

/*
 * Check if the volume can be changed in this browser/device.
 * Volume cannot be changed in a lot of mobile devices.
 * Specifically, it can't be changed from 1 on iOS.
 *
 * @return {Boolean}
 */
Ogvjs.canControlVolume = function() {
  return false;
};

/*
 * Check if playbackRate is supported in this browser/device.
 *
 * @return {Number} [description]
 */
Ogvjs.canControlPlaybackRate = function() {
  return false;
};

/*
 * Check to see if native text tracks are supported by this browser/device
 *
 * @return {Boolean}
 */
Ogvjs.supportsNativeTextTracks = function() {
  return false;
};

/**
 * An array of events available on the Ogvjs tech.
 *
 * @private
 * @type {Array}
 */
Ogvjs.Events = [
  'loadstart',
  'suspend',
  'abort',
  'error',
  'emptied',
  'stalled',
  'loadedmetadata',
  'loadeddata',
  'canplay',
  'canplaythrough',
  'playing',
  'waiting',
  'seeking',
  'seeked',
  'ended',
  'durationchange',
  'timeupdate',
  'progress',
  'play',
  'pause',
  'ratechange',
  'volumechange'
];

/*
 * Set the tech's volume control support status
 *
 * @type {Boolean}
 */
Ogvjs.prototype.featuresVolumeControl = Ogvjs.canControlVolume();

/*
 * Set the tech's playbackRate support status
 *
 * @type {Boolean}
 */
Ogvjs.prototype.featuresPlaybackRate = Ogvjs.canControlPlaybackRate();

/*
 * Set the the tech's fullscreen resize support status.
 * HTML video is able to automatically resize when going to fullscreen.
 * (No longer appears to be used. Can probably be removed.)
 */
Ogvjs.prototype.featuresFullscreenResize = true;

/*
 * Set the tech's progress event support status
 * (this disables the manual progress events of the Tech)
 */
Ogvjs.prototype.featuresProgressEvents = true;

/*
 * Sets the tech's status on native text track support
 *
 * @type {Boolean}
 */
Ogvjs.prototype.featuresNativeTextTracks = Ogvjs.supportsNativeTextTracks();

Ogvjs.disposeMediaElement = function(el) {
  if (!el) {
    return;
  }

  if (el.parentNode) {
    el.parentNode.removeChild(el);
  }

  // remove any child track or source nodes to prevent their loading
  while (el.hasChildNodes()) {
    el.removeChild(el.firstChild);
  }

  // remove any src reference. not setting `src=''` because that causes a warning
  // in firefox
  el.removeAttribute('src');

  // force the media element to update its loading state by calling load()
  // however IE on Windows 7N has a bug that throws an error so need a try/catch (#793)
  if (typeof el.load === 'function') {
    // wrapping in an iife so it's not deoptimized (#1060#discussion_r10324473)
    (function() {
      try {
        el.load();
      } catch (e) {
        // not supported
      }
    }());
  }
};

Tech.registerTech('Ogvjs', Ogvjs);
export default Ogvjs;

