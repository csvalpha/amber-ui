import { ApplicationRoute } from 'alpha-amber/routes/application/application';

export default class SogIndexRoute extends ApplicationRoute {
  breadCrumb = { title: 'Namen leren' }

  canAccess() {
    return this.can.can('show sog/name-trainer');
  }

  model() {
    return this.store.findAll('group');
  }
}

