import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class EditIndexRoute extends AuthenticatedRoute {
  get tabItems() {
    const user = this.controller.model;
    return [
      {
        link: 'users.user.edit.index',
        title: 'Algemeen',
        linkArgument: user,
        canAccess: true,
      },
      {
        link: 'users.user.edit.permissions',
        title: 'Rechten',
        linkArgument: user,
        canAccess: this.abilities.can('create permissions-users'),
      },
      {
        link: 'users.user.edit.privacy',
        title: 'Privacy',
        linkArgument: user,
        canAccess: this.session.currentUser === user,
      },
      {
        link: 'users.user.edit.security',
        title: 'Beveiliging',
        linkArgument: user,
        canAccess: this.session.currentUser === user,
      },
    ];
  }

  canAccess(model) {
    return this.abilities.can('edit user', model);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
