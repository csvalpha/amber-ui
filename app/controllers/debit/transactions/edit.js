import { action } from '@ember/object';
import EditController from 'amber-ui/controllers/application/edit';
import { inject as service } from '@ember/service';

export default class EditTransactionController extends EditController {
  successMessage = 'Transactie aangepast!';
  cancelMessage = 'Transactie wijzigen geannuleerd.';
  successTransitionTarget = 'debit.collections.show';
  cancelTransitionTarget = 'debit.collections.show';
  @service store;

  @action
  async submit() {
    this.successTransitionModel = await this.model.collection;
    super.submit();
  }

  @action
  async cancel() {
    this.cancelTransitionModel = await this.model.collection;
    super.cancel()
  }

  get users() {
    return this.store.findAll('user');
  }

  @action
  setUser(user) {
    this.model.user = user;
  }
}
