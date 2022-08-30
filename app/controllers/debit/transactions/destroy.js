import DestroyController from 'amber-ui/controllers/application/destroy';

export default class DebitTransactionDestroyController extends DestroyController {
  successTransitionTarget = 'debit.collections';
}
