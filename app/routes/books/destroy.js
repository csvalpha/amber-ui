import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DestroyBookRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Boek verwijderen' };

  canAccess() {
    return this.abilities.can('destroy books');
  }

  model(params) {
    return this.store.findRecord('book', params.id, params);
  }
}
