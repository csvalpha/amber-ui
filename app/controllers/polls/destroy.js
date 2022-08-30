import DestroyController from 'amber-ui/controllers/application/destroy';

export default class PollDestroyController extends DestroyController {
  successMessage = 'Poll verwijderd!';
  successTransitionTarget = 'polls.index';
}
