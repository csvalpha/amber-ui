import DestroyController from 'amber-ui/controllers/application/destroy';
import { action } from '@ember/object';

export default class DebitTransactionDestroyController extends DestroyController {
  successTransitionTarget = 'debit.collections.index';
  cancelTransitionTarget = 'debit.collections.show';

  @action
  async cancel() {
    this.cancelTransitionModel = await this.model.collection;
    super.cancel();
  }
}
