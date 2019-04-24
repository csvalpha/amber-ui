import UserEditRoute from 'alpha-amber/routes/users/edit';

export default UserEditRoute.extend({
  canAccess() {
    return this.can('create permissions-users');
  }
});

