import EditPollController from './edit';

export default class NewPollController extends EditPollController {
  cancelTransitionTarget = 'polls.index';
  cancelTransitionModel = null;
}
