import { play } from './player.js';

const App = {
  data() {
    return {
      vastURLChoice: 'test',
      videoSrc:
        'https://iab-publicfiles.s3.amazonaws.com/vast/VAST-4.0-Short-Intro.mp4',
      vastURLExamples: [
        'https://raw.githubusercontent.com/InteractiveAdvertisingBureau/VAST_Samples/master/VAST%204.2%20Samples/Category-test.xml',
        'https://raw.githubusercontent.com/InteractiveAdvertisingBureau/VAST_Samples/master/VAST%204.2%20Samples/Inline_Simple.xml',
        'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=[timestamp]',
      ],
      ondurationchange(x) {
        console.warn(x);
      },
    };
  },
  methods: {
    reverseMessage() {
      console.warn('REVERSE');
      this.message = this.message.split('').reverse().join('');
    },
    onPlayClicked() {
      this.videoSrc =
        'https://iab-publicfiles.s3.amazonaws.com/vast/VAST-4.0-Short-Intro.mp4';
    },
    second() {
      console.warn('SECONDE');
    },
  },
};

Vue.createApp(App).mount('#app');
