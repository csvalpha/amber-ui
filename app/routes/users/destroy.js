import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class DestroyUserRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Lid verwijderen' }

  canAccess(model) {
    return this.can.can('destroy user', model);
  }

  model(params) {
    return this.store.findRecord('user', params.id, params);
  }
}
