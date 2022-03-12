import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  fetch: service(),

  queryParams: ['email'],
  email: null,

  actions: {
    async forgotPassword() {
      const response = await this.fetch.post('/users/reset_password', {
        body: { email: this.email },
      });

      if (response.ok) {
        this.set(
          'successMessage',
          'Je ontvangt een e-mail met verdere instructies'
        );
      } else {
        this.set('errorMessage', 'Er ging iets mis, probeer het nog een keer');
      }
    },
  },
});
