import EditUserRoute from 'alpha-amber/routes/users/edit';

export default class EditUserPermissionsRoute extends EditUserRoute {
  canAccess() {
    return this.can.can('create permissions-users');
  }
}
