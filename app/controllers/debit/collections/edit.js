import { action } from '@ember/object';
import EditController from 'amber-ui/controllers/application/edit';

export default class DebitCollectionEditController extends EditController {
  successMessage = 'Incasso aangepast!';
  cancelMessage = 'Incasso aanpassen geannuleerd.';
  successTransitionTarget = 'debit.collections.show';

  get users() {
    return this.store.findAll('user');
  }

  @action
  addUser(user) {
    this.model
      .get('transactions')
      .pushObject(this.store.createRecord('debit/transaction', { user }));
  }

  @action
  removeTransaction(transaction) {
    // todo: refactor this to be more in accordance with how we do deletions (such as showing feedback with the flash notice)
    transaction.deleteRecord();
  }

  @action
  async submit() {
    this.errorMessage = null;
    try {
      const savedModel = await this.model.saveWithTransactions();
      this.modelSaveUtil.onSuccess(savedModel);
    } catch (error) {
      this.modelSaveUtil.onError(error);
    }
  }
}
