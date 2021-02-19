import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class ShowArticleRoute extends AuthenticatedRoute {
  get breadCrumb() {
    return { title: this.controller.model.email };
  }

  get pageActions() {
    const mailAlias = this.controller.model;
    return [
      {
        link: 'mail-aliases.edit',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: mailAlias,
        canAccess: this.can.can('edit mail-aliases')
      },
      {
        link: 'mail-aliases.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: mailAlias,
        canAccess: this.can.can('destroy mail-aliases')
      }
    ];
  }

  canAccess() {
    return this.can.can('show mail-aliases');
  }

  model(params) {
    return this.store.findRecord('mail-alias', params.id, params);
  }
}
