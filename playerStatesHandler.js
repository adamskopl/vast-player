export { handler };

const STATES = {
  LOADING: 'LOADING',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  READY_TO_LOAD: 'READY_TO_LOAD',
};

let state = STATES.READY_TO_LOAD;
let app = null;

const handler = {
  init(vueAppInstance) {
    app = vueAppInstance;
  },
  [STATES.LOADING]() {},
  onVideoChoice(vastURL) {
    switch (state) {
      case STATES.READY_TO_LOAD:
        app.vastURLChoice = vastURL;
        this[STATES.LOADING]();
        break;
      default:
        this.onUnhandledState('onVideoChoice');
    }
  },
  onUnhandledState(event) {
    console.error(`Unhandled state ${state} -> ${event}`);
  },
};
