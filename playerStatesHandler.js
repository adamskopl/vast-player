import { play } from './player.js';

export { handler };

const STATES = {
  ENDED: 'ENDED',
  LOADING: 'LOADING',
  LOADING_ERROR: 'LOADING_ERROR',
  PAUSED: 'PAUSED',
  PLAYING: 'PLAYING',
  READY_TO_LOAD: 'READY_TO_LOAD',
};

let state = STATES.READY_TO_LOAD;
let app = null;
let progressIntervalID = null;

const handler = {
  init(vueAppInstance) {
    app = vueAppInstance;
  },
  [STATES.ENDED]() {
    state = STATES.ENDED;
    app.controls.state = STATES.ENDED;
    getVideoEl().load();
    clearInterval(progressIntervalID);
  },
  [STATES.LOADING]() {
    state = STATES.LOADING;
    app.overlay.loading = true;
    clearErrors();
  },
  [STATES.LOADING_ERROR](e) {
    state = STATES.LOADING_ERROR;
    app.overlay.errorMessage = e.toString();
    app.overlay.loading = false;
    unloadVideo(app);
  },
  [STATES.PAUSED]() {
    state = STATES.PAUSED;
    app.controls.state = STATES.PAUSED;
    getVideoEl().pause();
  },
  [STATES.PLAYING]() {
    state = STATES.PLAYING;
    app.controls.state = STATES.PLAYING;
    // getVideoEl().playbackRate = 10.0;
    getVideoEl().play();
    progressLoop();

    function progressLoop() {
      const $vid = getVideoEl();
      clearInterval(progressIntervalID);
      progressIntervalID = setInterval(function () {
        app.progressValue = Math.round(
          ($vid.currentTime / $vid.duration) * 100
        );
      });
    }
  },
  onEnded() {
    switch (state) {
      case STATES.PLAYING:
        this[STATES.ENDED]();
        break;
      default:
        this.onUnhandledState('onEnded');
    }
  },
  onVidClicked() {
    switch (state) {
      case STATES.ENDED:
      case STATES.PAUSED:
        this[STATES.PLAYING]();
        break;
      case STATES.PLAYING:
        this[STATES.PAUSED]();
        break;
      default:
        this.onUnhandledState('onVidClicked');
    }
  },
  async onVastChoice(vastURL) {
    switch (state) {
      case STATES.ENDED:
      case STATES.LOADING_ERROR:
      case STATES.PAUSED:
      case STATES.PLAYING:
      case STATES.READY_TO_LOAD:
        this[STATES.LOADING]();
        app.vastURLChoice = vastURL;
        unloadVideo(app);
        try {
          app.videoSrc = await play(vastURL);
          getVideoEl().load();
        } catch (e) {
          this[STATES.LOADING_ERROR](e.toString());
        }
        break;
      default:
        this.onUnhandledState('onVastChoice');
    }
  },
  onVidCanPlayThrough() {
    switch (state) {
      case STATES.LOADING:
        app.overlay.loading = false;
        clearErrors();
        this[STATES.PLAYING]();
        break;
      default:
        this.onUnhandledState('onVidCanPlay');
    }
  },
  onUnhandledState(event) {
    console.error(`Unhandled state ${state} -> ${event}`);
  },
};

function getVideoEl() {
  return document.querySelector('#vast-video');
}

function clearErrors() {
  app.overlay.errorMessage = '';
}

function unloadVideo(vueApp) {
  getVideoEl().pause();
  vueApp.videoSrc = '';
}
