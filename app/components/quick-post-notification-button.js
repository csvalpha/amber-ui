import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  session: service(),
  notification: service(),
  actions: {
    sendTest() {
      this.get('notification').new('Test', 'Dit is een test bericht', '/images/alphalogonotext.png');
    },
    activate() {
      this.get('notification').getPermission();
    },
    disable() {
      this.get('notification').turnOff();
      this.send('sendTest');
    },
    soundOn() {
      this.get('notification').toggleSound();
      this.send('sendTest');
    }
  }
});
