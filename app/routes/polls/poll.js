import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class PollRoute extends AuthenticatedRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller?.model.question.question };
  }

  canAccess() {
    return this.abilities.can('show polls');
  }

  model(params) {
    return this.store.findRecord('poll', params.id, params);
  }
}
