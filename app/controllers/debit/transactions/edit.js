// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { action } from '@ember/object';
import EditController from 'amber-ui/controllers/application/edit';
import { inject as service } from '@ember/service';


export default class EditTransactionController extends EditController {
  successMessage = 'Transactie aangepast!';
  successTransitionTarget = 'debit.collections.show';
  @service store;

  @action
  async submit() {
    // couldn't figure out how to do set the successTransitionModel reactively, so we fetch it manually here
    this.successTransitionModel = await this.model.collection;
    super.submit();
  }

  get users() {
    return this.store.findAll('user');
  }

  @action
  setUser(user) {
    this.model.set('user', user);
  }
}
