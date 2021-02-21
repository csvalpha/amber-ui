import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class DestroyPollRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Poll verwijderen' }

  canAccess() {
    return this.can.can('destroy polls');
  }

  model(params) {
    return this.store.findRecord('poll', params.id, params);
  }
}
