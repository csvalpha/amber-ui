import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class NotificationService extends Service {
  isSupported = null;
  @tracked permissionIsGranted = null;
  @tracked permissionIsDenied = null;
  @tracked isEnabled = null;
  @tracked isSoundEnabled = null;
  notificationSound = new Audio('/sounds/notification.mp3');

  constructor() {
    super(...arguments);

    if ('Notification' in window) {
      this.isSupported = true;
      this.permissionIsGranted = (Notification.permission === 'granted');
      this.permissionIsDenied = (Notification.permission === 'denied');
      this.isEnabled = (localStorage.getItem('notificationEnabled') === 'true');
      this.isSoundEnabled = (localStorage.getItem('notificationSoundEnabled') === 'true');
    } else {
      this.isSupported = false;
      this.permissionIsGranted = false;
      this.permissionIsDenied = false;
      this.isEnabled = false;
      this.isSoundEnabled =  false;
    }
  }

  getPermission() {
    if (!this.isEnabled) {
      Notification.requestPermission(permission => {
        if (permission === 'granted') {
          this.permissionIsGranted = true;
          this.new(
            'Notificaties zijn nu ingeschakeld',
            'Je zult ze ontvangen bij elk Quickpost bericht',
            '/images/alphalogonotext.png'
          );
        } else if (permission === 'denied') {
          this.permissionIsGranted = false;
          this.permissionIsDenied = true;
          return false;
        }
      });
    }

    this.isEnabled = this.permissionIsGranted;
    localStorage.setItem('notificationEnabled', this.permissionIsGranted);
    this.isSoundEnabled = false;
    localStorage.setItem('notificationSoundEnabled', this.isSoundEnabled);
  }

  turnOff() {
    this.isEnabled = false;
    localStorage.setItem('notificationEnabled', false);
  }

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
  }

  toggleSound() {
    this.isSoundEnabled = !this.isSoundEnabled;
    localStorage.setItem('notificationSoundEnabled', this.isSoundEnabled);
  }

  soundOn() {
    this.isSoundEnabled = true;
    localStorage.setItem('notificationSoundEnabled', this.isSoundEnabled);
  }
}
