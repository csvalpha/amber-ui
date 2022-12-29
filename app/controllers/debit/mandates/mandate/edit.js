import EditController from 'amber-ui/controllers/application/edit';
import { inject as service } from '@ember/service';

export default class MandateEditController extends EditController {
  @service store;

  successTransitionTarget = 'debit.mandates.mandate';

  get users() {
    return this.store.findAll('user');
  }
}
