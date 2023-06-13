import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class MailModerationRejectRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Moderatieverzoek afwijzen' };

  canAccess() {
    return this.abilities.can('reject mail-moderations');
  }
}
