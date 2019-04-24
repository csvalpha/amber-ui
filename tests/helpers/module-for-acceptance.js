import { module } from 'qunit';
import { resolve } from 'rsvp';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

export default function(name, options = {}, nested) {
  module(name, {
    beforeEach() {
      this.application = startApp();

      // Create a user with id=1 for /users/me
      server.create('user');

      if (options.beforeEach) {
        options.beforeEach(...arguments);
      }
    },

    afterEach() {
      const afterEach = options.afterEach && options.afterEach(...arguments);
      return resolve(afterEach).then(() => destroyApp(this.application));
    }
  }, nested);
}
