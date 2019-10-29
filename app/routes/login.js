import { inject as service } from '@ember/service';
import { resolve } from 'rsvp';
import Route from '@ember/routing/route';
import { typeOf } from '@ember/utils';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {
  session: service('session'),
  actions: {
    authenticate() {
      this.set('controller.errorMessage', null);

      const headers = {};
      if (this.get('controller.twoFactorRequired')) {
        headers['X-Amber-OTP'] = this.get('controller.verificationCode');
      }

      const username = this.get('controller.username');
      const password = this.get('controller.password');

      // This is wrapped in a promise, to let the tests
      // know there is a promise which should be resolved first.
      return resolve(
        this.session
          .authenticate('authenticator:oauth-2', username, password, undefined, headers)
          .then(() => {
            this.set('controller.username', null);
            this.set('controller.password', null);
            return this.transitionTo(this.controllerFor('application').get('previousRouteName'));
          }).catch((error) => {
            // Ember-simple-auth will reject with strings if something truly bad happens
            if (typeOf(error) === 'string') {
              this.set('controller.errorMessage', error);
              return;
            }

            // This is the "error" stating that a 2FA code is required
            if (error.headers.get('x-amber-otp') === 'required') {
              this.set('controller.twoFactorRequired', true);
              return;
            }

            // The 2FA code was provided along with user & pass, but was wrong
            if (error.headers.get('x-amber-otp') === 'invalid') {
              this.set('controller.errorMessage', 'Deze authenticatiecode is niet geldig.');
              return;
            }

            if (error.responseJSON.error === 'invalid_grant') {
              this.set('controller.errorMessage', 'De ingevoerde combinatie is niet bekend');
              return;
            }

            if (error.status === 429) {
              this.set('controller.errorMessage', 'Je hebt teveel inlogpogingen gedaan. Probeer het over een paar minuten opnieuw.');
            }
          }
          )
      );
    }
  }
});
