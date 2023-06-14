import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class SogIndexRoute extends ApplicationRoute {
  breadcrumb = { title: 'Namen leren' };

  canAccess() {
    return this.abilities.can('show sog/name-trainer');
  }

  model() {
    return this.store.findAll('group');
  }
}
