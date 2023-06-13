import EditIndexRoute from './index';

export default class EditPermissionsRoute extends EditIndexRoute {
  canAccess() {
    return this.abilities.can('create permissions-users');
  }
}
