import Service, { inject as service } from '@ember/service';
import messageBus from 'message-bus';

export default Service.extend({
  fetch: service(),

  init() {
    messageBus.headers = { 'Authorization': this.get('fetch.authorizationHeader') };
    messageBus.baseUrl = '/api/';
    messageBus.start();
    this.set('message-bus', messageBus);
    this._super(...arguments);
  },

  subscribe(channel, func, lastId) {
    this['message-bus'].subscribe(channel, func, lastId);
  }
});
