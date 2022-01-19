import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class IcalRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Agenda Ical' };

  canAccess() {
    return this.abilities.can('show ical activities');
  }
}
