import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class MailModerationDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Moderatieverzoek negeren' };

  canAccess() {
    return this.abilities.can('destroy mail-moderations');
  }
}
