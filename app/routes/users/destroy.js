import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DestroyUserRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Lid verwijderen' };

  canAccess(model) {
    return this.abilities.can('destroy user', model);
  }

  model(params) {
    return this.store.findRecord('user', params.id, params);
  }
}
