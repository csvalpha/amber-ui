import ShowUserRouter from 'alpha-amber/routes/users/show';

export default class ShowUserPermissions extends ShowUserRouter {
  get pageActions() {
    const user = this.controller.model;
    return [
      {
        link: 'users.edit-permissions',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: user,
        canAccess: this.can.can('edit user', user)
      }
    ];
  }

  canAccess() {
    return this.can.can('show permissions-users');
  }
}
