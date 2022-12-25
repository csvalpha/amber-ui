import DestroyController from 'amber-ui/controllers/application/destroy';
import { action } from '@ember/object';

export default class DebitTransactionDestroyController extends DestroyController {
  successTransitionTarget = 'debit.collections.collection';
  cancelTransitionTarget = 'debit.collections.collection';

  get successTransitionModel() {
    return this.collection;
  }

  get cancelTransitionModel() {
    return this.collection;
  }

  @action
  async destroyModel() {
    this.collection = await this.model.collection;
    super.destroyModel();
  }

  @action
  async cancel() {
    this.collection = await this.model.collection;
    super.cancel();
  }
}
