import EditIndexController from '.';

export default class EditPermissionsController extends EditIndexController {
  successMessage = 'Rechten gewijzigd!';
  successTransitionTarget = 'users.user.permissions';
}
