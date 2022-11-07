import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ActivityPrintEnrolledRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Print inschrijvingen/streeplijst' };

  canAccess(model) {
    return this.abilities.can('edit activity', model);
  }
}
