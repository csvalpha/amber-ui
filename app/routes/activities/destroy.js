import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class DestroyActivityRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Activiteit verwijderen' }

  canAccess() {
    return this.abilities.can('destroy activities');
  }

  model(params) {
    return this.store.findRecord('activity', params.id, params);
  }
}
