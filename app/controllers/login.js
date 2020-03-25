import Controller from '@ember/controller';
import { resolve } from 'rsvp';
import { typeOf } from '@ember/utils';
import { inject as service }  from '@ember/service';

export default Controller.extend({
  session: service(),

  username: null,
  password: null,
  errorMessage: null,
  twoFactorRequired: null,
  verificationCode: null,

  actions: {
    authenticate() {
      this.set('errorMessage', null);

      const headers = {};
      if (this.twoFactorRequired) {
        headers['X-Amber-OTP'] = this.verificationCode;
      }

      // This is wrapped in a promise, to let the tests
      // know there is a promise which should be resolved first.
      return resolve(
        this.session
          .authenticate('authenticator:oauth2', this.username, this.password, undefined, headers)
          .then(() => {
            this.set('username', null);
            this.set('password', null);
            return this.transitionTo(this.controllerFor('application').get('previousRouteName'));
          }).catch((error) => {
            // Ember-simple-auth will reject with strings if something truly bad happens
            if (typeOf(error) === 'string') {
              this.set('errorMessage', error);
              return;
            }

            // This is the "error" stating that a 2FA code is required
            if (error.headers.get('x-amber-otp') === 'required') {
              this.set('twoFactorRequired', true);
              return;
            }

            // The 2FA code was provided along with user & pass, but was wrong
            if (error.headers.get('x-amber-otp') === 'invalid') {
              this.set('errorMessage', 'Deze authenticatiecode is niet geldig.');
              return;
            }

            if (error.responseJSON.error === 'invalid_grant') {
              this.set('errorMessage', 'De ingevoerde combinatie is niet bekend');
              return;
            }

            if (error.status === 429) {
              this.set('errorMessage', 'Je hebt teveel inlogpogingen gedaan. Probeer het over een paar minuten opnieuw.');
            }
          }
          )
      );
    }
  }
});
