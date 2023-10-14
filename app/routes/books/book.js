import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class BookRoute extends AuthenticatedRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller?.model.title };
  }

  canAccess() {
    return this.abilities.can('show books');
  }

  model(params) {
    return this.store.findRecord('book', params.id, params);
  }
}
