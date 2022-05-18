// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { action, computed } from '@ember/object';
import EditController from 'amber-ui/controllers/application/edit';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { alias } from '@ember/object/computed';

export default class EditTransactionController extends EditController {
  successMessage = 'Transactie aangepast!';
  successTransitionTarget = 'debit.collections.show';

  @alias('model.collection.id')
  successTransitionModel;

  @computed('store', function () {
    return this.store.findAll('user');
  })
  users;

  @action
  setUser(user) {
    this.model.set('user', user);
  }
}
