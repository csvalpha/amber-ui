import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class IcalRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Agenda Ical' };

  canAccess() {
    return this.abilities.can('show ical activities');
  }
}
