import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  session: service(),
  notification: service(),
  actions: {
    sendTest() {
      this.notification.new('Test', 'Dit is een test bericht', '/images/alphalogonotext.png');
    },
    activate() {
      this.notification.getPermission();
    },
    disable() {
      this.notification.turnOff();
      this.send('sendTest');
    },
    soundOn() {
      this.notification.toggleSound();
      this.send('sendTest');
    }
  }
});
