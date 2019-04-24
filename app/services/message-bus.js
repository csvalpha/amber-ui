import Service, { inject as service } from '@ember/service';
import messageBus from 'message-bus';

export default Service.extend({
  ajax: service(),

  init() {
    messageBus.headers = this.get('ajax.headers');
    messageBus.baseUrl = '/api/';
    messageBus.start();
    this.set('message-bus', messageBus);
    this._super(...arguments);
  },

  subscribe(channel, func, lastId) {
    this.get('message-bus').subscribe(channel, func, lastId);
  }
});
