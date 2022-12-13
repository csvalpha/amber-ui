import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class QuickPostNotificationButton extends Component {
  @service session;
  @service notification;
  
  @action
  sendTest() {
    this.notification.new(
      'Test',
      'Dit is een test bericht',
      '/images/alphalogonotext.png'
    );
  }

  @action
  activate() {
    this.notification.getPermission();
  }

  @action
  disable() {
    this.notification.turnOff();
    this.send('sendTest');
  }

  @action
  soundOn() {
    this.notification.toggleSound();
    this.send('sendTest');
  }
}
