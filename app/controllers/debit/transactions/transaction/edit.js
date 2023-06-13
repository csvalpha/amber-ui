import EditController from 'amber-ui/controllers/application/edit';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TransactionEditController extends EditController {
  @service store;

  successMessage = 'Transactie aangepast!';
  cancelMessage = 'Transactie wijzigen geannuleerd.';
  successTransitionTarget = 'debit.collections.collection';

  get successTransitionModel() {
    return this.collection;
  }

  get users() {
    return this.store.findAll('user');
  }

  @action
  async submit() {
    this.collection = await this.model.collection;
    super.submit();
  }

  @action
  async cancel() {
    this.collection = await this.model.collection;
    super.cancel();
  }

  @action
  setUser(user) {
    this.model.user = user;
  }
}
