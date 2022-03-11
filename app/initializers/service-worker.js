import ENV from '../config/environment';

export default {
  name: 'service-worker',

  initialize() {
    let testing = ENV.environment === 'test'; // Do not register service worker in tests
    if (!testing && 'serviceWorker' in navigator) {
      // Register service worker for PWA
      navigator.serviceWorker.register('/sw.js');
    }
  },
};
