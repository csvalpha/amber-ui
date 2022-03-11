import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class DestroyBookRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Boek verwijderen' }

  canAccess() {
    return this.abilities.can('destroy books');
  }

  model(params) {
    return this.store.findRecord('book', params.id, params);
  }
}
