import EditUserRoute from 'amber-ui/routes/users/edit';

export default class EditUserPermissionsRoute extends EditUserRoute {
  canAccess() {
    return this.abilities.can('create permissions-users');
  }
}
