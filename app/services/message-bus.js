import Service, { inject as service } from '@ember/service';
import messageBus from 'message-bus';

export default class MessageBusService extends Service {
  @service fetch;

  constructor() {
    super(...arguments);

    messageBus.headers = { 'Authorization': this.fetch.authorizationHeader() };
    messageBus.baseUrl = '/api/';
    messageBus.start();
    this.messageBus = messageBus;
  }

  subscribe(channel, func, lastId) {
    this.messageBus.subscribe(channel, func, lastId);
  }
}
