import EditController from 'alpha-amber/controllers/application/edit';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from '@ember/object';

export default class EditMandateController extends EditController {
  successTransitionTarget = 'debit.mandates.show';

  @computed('store', function() {
    return this.store.findAll('user');
  })
  users;
}
