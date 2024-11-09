import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { typeOf } from '@ember/utils';

export default class LoginController extends Controller {
  @service session;

  @tracked errorMessage = null;
  @tracked username;
  @tracked password;
  @tracked verificationCode;
  @tracked twoFactorRequired;

  @action
  async authenticate() {
    const headers = {};
    if (this.twoFactorRequired) {
      headers['X-Amber-OTP'] = this.verificationCode;
    }

    try {
      await this.session.authenticate(
        'authenticator:oauth2',
        this.username,
        this.password,
        undefined,
        headers
      );
    } catch (error) {
      if (typeOf(error) === 'string') {
        this.errorMessage = error;
        return;
      }

      // This is the "error" stating that a 2FA code is required
      if (error.headers.get('x-amber-otp') === 'required') {
        this.twoFactorRequired = true;
        return;
      }

      // The 2FA code was provided along with user & pass, but was wrong
      if (error.headers.get('x-amber-otp') === 'invalid') {
        this.errorMessage = 'Deze authenticatiecode is niet geldig.';
        return;
      }

      if (error.responseJSON.error === 'invalid_grant') {
        this.errorMessage = 'De ingevoerde combinatie is niet bekend';
        return;
      }

      if (error.status === 429) {
        this.errorMessage =
          'Je hebt teveel inlogpogingen gedaan. Probeer het over een paar minuten opnieuw.';
      }
    }
  }
}
