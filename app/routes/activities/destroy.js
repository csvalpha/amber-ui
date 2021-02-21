import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class DestroyGroupRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Activiteit verwijderen' }

  canAccess() {
    return this.can.can('destroy activities');
  }

  model(params) {
    return this.store.findRecord('group', params.id, params);
  }
}

