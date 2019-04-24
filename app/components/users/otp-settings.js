import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isInvalidError } from 'ember-ajax/errors';

export default Component.extend({
  ajax: service(),
  flashNotice: service(),
  actions: {
    disableOTP() {
      this.set('otpErrorMessage', null);
      this.set('otpVerificationImage', null);

      const userId = this.get('model.id');
      this.get('ajax').patch(`/users/${userId}`, {
        /* eslint-disable camelcase */
        data: {
          data: {
            attributes: {
              otp_required: false
            },
            id: userId,
            type: 'users'
          }
        }
        /* eslint-enable camelcase */
      }).then(() => {
        this.get('flashNotice').sendWarning('Two-factor authenticatie gedeactiveerd!');
        this.set('model.otpRequired', false);
      }).catch((error) => {
        this.set('otpErrorMessage', error.payload.errors ? error.payload.errors[0].detail : error.payload);
      });
    },
    generateOTP() {
      this.set('otpErrorMessage', null);
      this.set('otpVerificationImage', null);

      const userId = this.get('model.id');
      this.get('ajax').post(`/users/${userId}/generate_otp_provisioning_uri`).then((response) => {
        this.set('otpVerificationImage', response.data_url);
      }).catch((error) => {
        this.set('otpErrorMessage', error.payload.errors ? error.payload.errors[0].detail : error.payload);
      });
    },
    confirmOTP() {
      this.set('otpErrorMessage', null);

      const userId = this.get('model.id');
      this.get('ajax').post(`/users/${userId}/activate_otp`, {
        /* eslint-disable camelcase */
        data: {
          one_time_password: this.get('verificationCode')
        }
        /* eslint-enable camelcase */
      }).then(() => {
        this.set('model.otpRequired', true);
        this.set('verificationCode', null);
        this.set('otpVerificationImage', null);
        this.get('flashNotice').sendSuccess('Two-factor authenticatie geactiveerd!');
      }).catch((error) => {
        if (isInvalidError(error)) {
          this.set('otpErrorMessage', 'Deze authenticatiecode is niet geldig');
        }
      });
    }
  }
});
