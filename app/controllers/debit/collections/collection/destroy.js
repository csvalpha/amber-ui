import DestroyController from 'amber-ui/controllers/application/destroy';

export default class CollectionDestroyController extends DestroyController {
  successTransitionTarget = 'debit.collections';
  cancelTransitionTarget = 'debit.collections.collection';
}
