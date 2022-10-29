import UserEditController from 'amber-ui/controllers/users/edit';

export default class EditUserPermissionsController extends UserEditController {
  successMessage = 'Rechten gewijzigd!';
  successTransitionTarget = 'users.show-permissions';
}
