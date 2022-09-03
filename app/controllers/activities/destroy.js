import DestroyController from 'amber-ui/controllers/application/destroy';

export default class ActivityDestroyController extends DestroyController {
  successTransitionTarget = 'activities.index';
}
