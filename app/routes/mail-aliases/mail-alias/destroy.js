import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class MailAliasDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Mail alias verwijderen' };

  canAccess() {
    return this.abilities.can('destroy mail-aliases');
  }
}
