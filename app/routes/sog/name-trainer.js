import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class SogIndexRoute extends ApplicationRoute {
  breadCrumb = { title: 'Namen leren' };

  canAccess() {
    return this.abilities.can('show sog/name-trainer');
  }

  model() {
    return this.store.findAll('group');
  }
}
