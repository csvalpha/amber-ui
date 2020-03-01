import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { isNotFoundResponse } from 'ember-fetch/errors';

export default Controller.extend({
  fetch: service(),
  actions: {
    async resendActivation() {
      this.set('errorMessage', null);
      const userId = this.get('model.id');
      const response = await this.fetch.post(`/users/${userId}/resend_activation_mail`);

      if (response.ok) {
        this.transitionToRoute('users.show', this.model);
      } else if (isNotFoundResponse) {
        this.set('errorMessage', 'Deze gebruiker is al geactiveerd!');
      } else {
        this.set('errorMessage', 'Er is wat fout gegaan.');
      }
    }
  }
});
