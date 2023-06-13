import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class MailModerationAcceptRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Moderatieverzoek goedkeuren' };

  canAccess() {
    return this.abilities.can('accept mail-moderations');
  }
}
