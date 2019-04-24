import UserEditController from 'alpha-amber/controllers/users/edit';

export default UserEditController.extend({
  successMessage: 'Rechten gewijzigd!',
  successTransitionTarget: 'users.show-permissions'
});
