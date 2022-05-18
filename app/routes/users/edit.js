import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class EditUserRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Lid aanpassen' };

  get tabItems() {
    const user = this.controller.model;
    return [
      {
        link: 'users.edit',
        title: 'Algemeen',
        linkArgument: user,
        canAccess: true,
      },
      {
        link: 'users.edit-permissions',
        title: 'Rechten',
        linkArgument: user,
        canAccess: this.abilities.can('create permissions-users'),
      },
      {
        link: 'users.edit-privacy',
        title: 'Privacy',
        linkArgument: user,
        canAccess: this.session.currentUser === user,
      },
      {
        link: 'users.edit-security',
        title: 'Beveiliging',
        linkArgument: user,
        canAccess: this.session.currentUser === user,
      },
    ];
  }

  canAccess(model) {
    return this.abilities.can('edit user', model);
  }

  model(params) {
    return this.store.findRecord('user', params.id, params);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
