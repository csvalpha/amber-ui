import DestroyController from 'amber-ui/controllers/application/destroy';
import { action } from '@ember/object';

export default class DebitTransactionDestroyController extends DestroyController {
  successTransitionTarget = 'debit.collections.show';
  cancelTransitionTarget = 'debit.collections.show';

  @action
  async destroyModel() {
    this.successTransitionModel = await this.model.collection;
    super.destroyModel();
  }

  @action
  async cancel() {
    this.cancelTransitionModel = await this.model.collection;
    super.cancel();
  }
}
