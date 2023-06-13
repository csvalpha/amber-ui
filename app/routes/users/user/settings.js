import UserIndexRoute from './index';

export default class UserSettingsRoute extends UserIndexRoute {
  get pageActions() {
    const user = this.controller.model;
    return [
      {
        link: 'users.user.edit.privacy',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: user,
        canAccess: this.abilities.can('edit user', user),
      },
    ];
  }

  canAccess(model) {
    return this.abilities.can('edit users', model);
  }
}
