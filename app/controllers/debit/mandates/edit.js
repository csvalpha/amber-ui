import EditController from 'amber-ui/controllers/application/edit';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { inject as service } from '@ember/service';

export default class EditMandateController extends EditController {
  successTransitionTarget = 'debit.mandates.show';

  @service store;

  get users() {
    return this.store.findAll('user');
  }
}
