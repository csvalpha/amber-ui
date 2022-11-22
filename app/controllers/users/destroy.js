import DestroyController from 'amber-ui/controllers/application/destroy';

export default class UserDestroyController extends DestroyController {
  successTransitionTarget = 'users.index';
  cancelTransitionTarget = 'users.show';
}
