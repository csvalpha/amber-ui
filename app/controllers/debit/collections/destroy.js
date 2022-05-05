import DestroyController from 'amber-ui/controllers/application/destroy';

export default class DebitCollectionDestroyController extends DestroyController {
  successTransitionTarget = 'debit.collections.index';
  cancelTransitionTarget = 'debit.collections.show';
}
