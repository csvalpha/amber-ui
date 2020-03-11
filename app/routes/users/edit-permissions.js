import UserEditRoute from 'alpha-amber/routes/users/edit';

export default UserEditRoute.extend({
  canAccess() {
    return this.can.can('create permissions-users');
  }
});

