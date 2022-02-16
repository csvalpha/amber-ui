import Controller from '@ember/controller';
import { typeOf } from '@ember/utils';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LoginController extends Controller {
  @tracked errorMessage;
  @service session;

  @tracked username;
  @tracked password;
  @tracked verificationCode;
  @tracked twoFactorRequired;

  @action
  async authenticate(e) {
    e.preventDefault();

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
