import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class UserForgotPasswordController extends Controller {
  @service fetch;

  @tracked errorMessage = null;
  @tracked successMessage;
  @tracked email = null;

  queryParams = ['email'];

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
