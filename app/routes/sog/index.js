import { ApplicationRoute } from 'alpha-amber/routes/application/application';

export default class SogIndexRoute extends ApplicationRoute {
  breadCrumb = { title: 'SOG' };

  canAccess() {
    return this.abilities.can('show sog');
  }

  model() {
    return [];
  }
}
