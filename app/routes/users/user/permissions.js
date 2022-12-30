import UserIndexRoute from './index';

export default class UserPermissionsRoute extends UserIndexRoute {
  get pageActions() {
    const user = this.controller.model;
    return [
      {
        link: 'users.user.edit.permissions',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: user,
        canAccess: this.abilities.can('edit user', user),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show permissions-users');
  }
}
