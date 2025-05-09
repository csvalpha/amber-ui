import EditController from 'amber-ui/controllers/application/edit';
import { action } from '@ember/object';

export default class CollectionEditController extends EditController {
  successMessage = 'Incasso aangepast!';
  cancelMessage = 'Incasso aanpassen geannuleerd.';
  successTransitionTarget = 'debit.collections.collection';

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
    // note: this deletion only persists when calling .save() on the transaction,
    // or by calling something like saveWithTransactions() on the collection.
    // TLDR: deleteRecord is not the same as destroyRecord
    transaction.deleteRecord();
  }

  @action
  async submit(event) {
    event.preventDefault();
    this.errorMessage = null;
    try {
      await this.model.saveWithTransactions();
      this.modelSaveUtil.onSuccess();
    } catch (error) {
      this.modelSaveUtil.onError(error);
    }
  }
}
