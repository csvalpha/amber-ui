import Controller from '@ember/controller';
import { typeOf } from '@ember/utils';
import { inject as service }  from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { get } from '@github/webauthn-json';

export default class LoginController extends Controller {
  @tracked errorMessage;
  @service session;
  @service fetch;

  @tracked username;
  @tracked password;
  @tracked mfaRequired;
  @tracked mfaMethods;
  @tracked loginStage = 'credentials'

  @tracked webauthnResponse;
  @tracked otpCode;

  get otpAvailable() {
    return this.mfaRequired && this.mfaMethods.includes('otp');
  }

  @action
  changeStage(stage) {
    this.loginStage = stage;
  }

  @action
  async authenticate(e) {
    e.preventDefault();
    await this.doAuth();
  }

  async doAuth() {
    const headers = {};
    const params = {};

    if (this.webauthnResponse) {
      params.webauthn = JSON.stringify(this.webauthnResponse);
    }

    if (this.otpCode) {
      params.otp = this.otpCode;
    }

    try {
      await this.session.authenticate('authenticator:oauth2', this.username, this.password, null, headers, params);
      this.loginStage = 'credentials';
    } catch(error) {
      if (typeOf(error) === 'string') {
        this.errorMessage = error;
        return;
      }

      // The 2FA code was provided along with user & pass, but was wrong
      if (error.headers.get('x-amber-mfa-error') === 'webauthn_failed') {
        this.errorMessage = 'Inloggen met security key mislukt';
      }

      if (error.headers.get('x-amber-mfa-error') === 'otp_failed') {
        this.errorMessage = 'Deze authenticatiecode is niet geldig.';
      }

      // Check if the header indicating that MFA is needed is set
      if (error.headers.get('x-amber-mfa') === 'required') {
        this.mfaRequired = true;
        this.mfaMethods = error.headers.get('x-amber-mfa-methods').split(',');

        // Init webauthn process
        if (this.mfaMethods.includes('webauthn') && this.loginStage !== 'otp') {
          this.loginStage = 'WebAuthn';

          // Fetch the challenge, and ask the security key to sign it
          const authOptions = await this.fetch.post('/webauthn/login/challenges', { body: { username: this.username } });
          this.webauthnResponse = await get({ publicKey: (await authOptions.json()) });

          // Send the data to the backend
          await this.doAuth();
        } else {
          this.loginStage = 'otp';
        }

        return;
      }

      if (error.responseJSON.error === 'invalid_grant') {
        this.errorMessage = 'De ingevoerde combinatie is niet bekend';
        return;
      }

      if (error.status === 429) {
        this.errorMessage = 'Je hebt teveel inlogpogingen gedaan. Probeer het over een paar minuten opnieuw.';
      }
    }
  }
}
