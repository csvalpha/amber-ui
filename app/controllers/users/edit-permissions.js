import UserEditController from 'amber-ui/controllers/users/edit';

export default UserEditController.extend({
  successMessage: 'Rechten gewijzigd!',
  successTransitionTarget: 'users.show-permissions',
});
