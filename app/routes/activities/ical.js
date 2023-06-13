import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ActivitiesIcalRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Agenda iCal' };

  canAccess() {
    return this.abilities.can('show ical activities');
  }
}
