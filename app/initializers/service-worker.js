export default {
  name: 'service-worker',

  initialize() {
    if ('serviceWorker' in navigator) {
      // Register service worker for PWA
      navigator.serviceWorker.register('sw.js');
    }
  }
};
