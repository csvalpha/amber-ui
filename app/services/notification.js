import Service from '@ember/service';

export default Service.extend({
  isSupported: null,
  permissionIsGranted: null,
  permissionIsDenied: null,
  isEnabled: null,
  isSoundEnabled: null,
  notificationSound: new Audio('/sounds/notification.mp3'),

  init() {
    if ('Notification' in window) {
      this.set('isSupported', true);
      this.set('permissionIsGranted', (Notification.permission === 'granted'));
      this.set('permissionIsDenied', (Notification.permission === 'denied'));
      this.set('isEnabled', (localStorage.getItem('notificationEnabled') === 'true'));
      this.set('isSoundEnabled', (localStorage.getItem('notificationSoundEnabled') === 'true'));
    } else {
      this.set('isSupported', false);
      this.set('permissionIsGranted', false);
      this.set('isEnabled', false);
      this.set('isSoundEnabled', false);
    }

    this._super(...arguments);
  },

  getPermission() {
    if (!this.isEnabled) {
      Notification.requestPermission(permission => {
        if (permission === 'granted') {
          this.set('permissionIsGranted', true);
          this.new(
            'Notificaties zijn nu ingeschakeld',
            'Je zult ze ontvangen bij elk Quickpost bericht',
            '/images/alphalogonotext.png'
          );
        } else if (permission === 'denied') {
          this.set('permissionIsGranted', false);
          this.set('permissionIsDenied', true);
          return false;
        }
      });
    }

    this.set('isEnabled', this.permissionIsGranted);
    localStorage.setItem('notificationEnabled', this.permissionIsGranted);
    this.set('isSoundEnabled', false);
    localStorage.setItem('notificationSoundEnabled', this.isSoundEnabled);
  },

  turnOff() {
    this.set('isEnabled', false);
    localStorage.setItem('notificationEnabled', false);
  },

  new(title, body, icon) {
    const options = {
      body,
      icon
    };
    if (this.permissionIsGranted && this.isEnabled) {
      try {
        return new Notification(title, options);
      } catch(error) {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('sw.js').then((registration) => {
            registration.showNotification(title, options);
          });
        }
      } finally {
        if (this.isSoundEnabled) {
          this.notificationSound.play();
        }
      }
    }
  },

  toggleSound() {
    this.toggleProperty('isSoundEnabled');
    localStorage.setItem('notificationSoundEnabled', this.isSoundEnabled);
  },

  soundOn() {
    this.set('isSoundEnabled', true);
    localStorage.setItem('notificationSoundEnabled', this.isSoundEnabled);
  }
});
