import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isInvalidResponse } from 'ember-fetch/errors';

export default Component.extend({
  fetch: service(),
  flashNotice: service(),
  actions: {
    async disableOTP() {
      this.set('otpErrorMessage', null);
      this.set('otpVerificationImage', null);

      const userId = this.model.id;
      const response = await this.fetch.patch(`/users/${userId}`, {
        /* eslint-disable camelcase */
        body: {
          data: {
            attributes: {
              otp_required: false
            },
            id: userId,
            type: 'users'
          }
        }
        /* eslint-enable camelcase */
      });

      if (response.ok) {
        this.flashNotice.sendWarning('Two-factor authenticatie gedeactiveerd!');
        this.set('model.otpRequired', false);
      } else if (isInvalidResponse(response)) {
        const json = await response.json();
        this.set('otpErrorMessage', json.errors ? json.errors[0].detail : response);
      }
    },
    async generateOTP() {
      this.set('otpErrorMessage', null);
      this.set('otpKey', null);

      const response = await this.fetch.post(`/users/${this.model.id}/generate_otp_secret`);
      let json = await response.json();

      if (response.ok) {
        this.set('otpKey', json.otp_code);
      } else if (isInvalidResponse(response)) {
        this.set('otpErrorMessage', json.errors ? json.errors[0].detail : response);
      }
    },
    async confirmOTP() {
      this.set('otpErrorMessage', null);

      const response = await this.fetch.post(`/users/${this.model.id}/activate_otp`, {
        /* eslint-disable camelcase */
        body: {
          one_time_password: this.verificationCode
        }
        /* eslint-enable camelcase */
      });

      if (response.ok) {
        this.set('model.otpRequired', true);
        this.set('verificationCode', null);
        this.set('otpVerificationImage', null);
        this.flashNotice.sendSuccess('Two-factor authenticatie geactiveerd!');
      } else if (isInvalidResponse(response)) {
        this.set('otpErrorMessage', 'Deze authenticatiecode is niet geldig');
      }
    }
  }
});
