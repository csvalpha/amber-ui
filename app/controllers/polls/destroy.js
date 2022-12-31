import DestroyController from 'amber-ui/controllers/application/destroy';

export default class PollDestroyController extends DestroyController {
  successMessage = 'Poll verwijderd!';
  cancelMessage = 'Poll verwijderen geannuleerd.';
  successTransitionTarget = 'polls.index';
  cancelTransitionTarget = 'polls.show';
}
