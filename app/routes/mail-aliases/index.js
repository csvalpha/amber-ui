import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class MailAliasesIndexRoute extends AuthenticatedRoute {
  get pageActions() {
    return [
      {
        link: 'mail-aliases.new',
        title: 'Nieuw mail alias',
        icon: 'plus',
        canAccess: this.abilities.can('create mail-aliases'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show mail-aliases');
  }

  model(params) {
    return this.store.query('mail-alias', params);
  }
}
