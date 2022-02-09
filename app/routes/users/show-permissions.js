import ShowUserRouter from 'alpha-amber/routes/users/show';

export default class ShowUserPermissions extends ShowUserRouter {
  get pageActions() {
    const user = this.controller.model;
    return [
      {
        link: 'users.edit-permissions',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: user,
        canAccess: this.abilities.can('edit user', user)
      }
    ];
  }

  canAccess() {
    return this.abilities.can('show permissions-users');
  }
}
