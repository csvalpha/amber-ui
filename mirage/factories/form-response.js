import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  afterCreate(response, server) {
    response.user = server.create('user');
  }
});
