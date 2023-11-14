import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class SogIndexRoute extends ApplicationRoute {
  breadcrumb = { title: 'SOG' };

  canAccess() {
    return this.abilities.can('show sog');
  }

  model() {
    return [];
  }
}
