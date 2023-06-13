import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class MailAliasIndexRoute extends AuthenticatedRoute {
  get pageActions() {
    const mailAlias = this.controller.model;
    return [
      {
        link: 'mail-aliases.mail-alias.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: mailAlias,
        canAccess: this.abilities.can('edit mail-aliases'),
      },
      {
        link: 'mail-aliases.mail-alias.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: mailAlias,
        canAccess: this.abilities.can('destroy mail-aliases'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show mail-aliases');
  }
}
