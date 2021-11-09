import { play } from './player.js';
import { handler } from './playerStatesHandler.js';

Vue.component('video-overlay-loading', {
  template: '#videoOverlayLoading',
  props: ['errorMessage', 'loading'],
});

Vue.component('video-overlay-controls', {
  template: '#videoOverlayControls',
  props: ['state'], // LOADING | PLAYING | PAUSED
});

const app = new Vue({
  el: '#app',
  data() {
    return {
      controls: {
        show: false,
        state: '', // PLAYING | PAUSED
      },
      overlay: {
        errorMessage: '',
        loading: false,
      },
      progressValue: 0,
      vastURLChoice: '',
      vastURLExamples: [
        'https://raw.githubusercontent.com/InteractiveAdvertisingBureau/VAST_Samples/master/VAST%204.2%20Samples/Category-test.xml',
        'https://raw.githubusercontent.com/InteractiveAdvertisingBureau/VAST_Samples/master/VAST%204.2%20Samples/Inline_Simple.xml',
        'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=[timestamp]',
      ],
      videoSrc: '',
    };
  },
  methods: {
    onExampleClicked(vastURL) {
      handler.onVastChoice(vastURL);
      // this.vastURLChoice = vastURL;
      // this.onPlayClicked(vastURL);
    },
    onPlayClicked() {
      this.playVast(this.vastURLChoice);
    },
    async playVast(vastURL) {
      try {
        this.overlay.errorMessage = '';
        this.overlay.loading = true;
        this.unloadVideo();
        this.videoSrc = await play(vastURL);
        getVideoEl().load();
      } catch (e) {
        this.overlay.errorMessage = e.toString();
        this.overlay.loading = false;
        this.unloadVideo();
      }
    },
    unloadVideo() {
      getVideoEl().pause();
      this.videoSrc = '';
      // $vid.load();
    },
    play() {
      console.warn('');
      this.overlay.loading = false;
      this.state = 'PAUSED';
    },
    vidOnAbort() {
      console.warn('@abort');
    },
    vidOnCanPlay() {
      console.warn('@canplay');
      // getVideoEl().play();
    },
    vidOnCanPlayThrough() {
      console.warn('@canplaythrough');
      handler.onVidCanPlayThrough();
    },
    vidOnEnded() {
      console.warn('@ended');
      handler.onEnded();
    },
    vidOnLoadedData() {
      console.warn('@loadeddata');
    },
    vidOnLoadStart() {
      console.warn('@loadstart');
    },
    vidOnPause() {
      console.warn('@pause');
    },
    vidOnPlay() {
      console.warn('@play');
    },
    vidOnStalled() {
      console.warn('@stalled');
    },
    onVidClicked() {
      handler.onVidClicked();
      // this.state = this.state === 'PAUSED' ? 'PLAYING' : 'PAUSED';
    },
  },
  mounted() {
    // this.onExampleClicked(this.vastURLExamples[2]);
    handler.init(this);
  },
});
