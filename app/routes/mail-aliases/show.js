import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class ShowMailAliasRoute extends AuthenticatedRoute {
  get breadCrumb() {
    return { title: this.controller.model.email };
  }

  get pageActions() {
    const mailAlias = this.controller.model;
    return [
      {
        link: 'mail-aliases.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: mailAlias,
        canAccess: this.abilities.can('edit mail-aliases')
      },
      {
        link: 'mail-aliases.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: mailAlias,
        canAccess: this.abilities.can('destroy mail-aliases')
      }
    ];
  }

  canAccess() {
    return this.abilities.can('show mail-aliases');
  }

  model(params) {
    return this.store.findRecord('mail-alias', params.id, params);
  }
}
