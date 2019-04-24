import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { isNotFoundError } from 'ember-ajax/errors';

export default Controller.extend({
  ajax: service(),
  actions: {
    resendActivation() {
      this.set('errorMessage', null);
      const model = this.get('model');
      const userId = this.get('model.id');
      const resendActivationRequest = this.get('ajax').post(`/users/${userId}/resend_activation_mail`);
      resendActivationRequest.then(() => {
        this.transitionToRoute('users.show', model);
      }).catch((error) => {
        if (isNotFoundError(error)) {
          this.set('errorMessage', 'Deze gebruiker is al geactiveerd!');
        } else {
          this.set('errorMessage', 'Er is wat fout gegaan.');
        }
      });
    }
  }
});
