import { play } from './player.js';

const App = {
  data() {
    return {
      vidErrorMessage: '',
      vastURLChoice: '',
      videoSrc: '',
      vastURLExamples: [
        'https://raw.githubusercontent.com/InteractiveAdvertisingBureau/VAST_Samples/master/VAST%204.2%20Samples/Category-test.xml',
        'https://raw.githubusercontent.com/InteractiveAdvertisingBureau/VAST_Samples/master/VAST%204.2%20Samples/Inline_Simple.xml',
        'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=[timestamp]',
      ],
    };
  },
  methods: {
    ondurationchange(x) {},
    async onExampleClicked(vastUrl) {
      this.playVast(vastUrl);
    },
    onPlayClicked() {},
    async playVast(vastURL) {
      this.vastURLChoice = vastURL;
      try {
        const $vid = document.querySelector('#vast-video');
        this.vidErrorMessage = '';
        this.unloadVideo();
        this.videoSrc = await play(vastURL);
        $vid.load();
        $vid.play();
      } catch (e) {
        this.vidErrorMessage = e.toString();
        this.unloadVideo();
      }
    },
    unloadVideo() {
      const $vid = document.querySelector('#vast-video');
      $vid.pause();
      this.videoSrc = '';
      $vid.load();
    },
  },
  mounted() {
    this.onExampleClicked(this.vastURLExamples[2]);
  },
};

Vue.createApp(App).mount('#app');
