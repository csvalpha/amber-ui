import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ForgotPasswordController extends Controller {
  @service fetch;
  queryParams = ['email'];
  @tracked email = null;
  @tracked successMessage;
  @tracked errorMessage;
  @action
  async forgotPassword() {
    const response = await this.fetch.post('/users/reset_password', {
      body: { email: this.email },
    });

    if (response.ok) {
      this.successMessage = 'Je ontvangt een e-mail met verdere instructies';
    } else {
      this.errorMessage = 'Er ging iets mis, probeer het nog een keer';
    }
  }
}
