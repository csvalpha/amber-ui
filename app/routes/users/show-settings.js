import ShowUserRouter from 'alpha-amber/routes/users/show';

export default class ShowUserSettings extends ShowUserRouter {
  get pageActions() {
    const user = this.controller.model;
    return [
      {
        link: 'users.edit-privacy',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: user,
        canAccess: this.abilities.can('edit user', user)
      }
    ];
  }

  canAccess(model) {
    return this.abilities.can('edit users', model);
  }
}
