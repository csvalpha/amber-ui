import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DestroyStaticPageRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Informatie pagina verwijderen' };

  canAccess() {
    return this.abilities.can('destroy static-pages');
  }

  model(params) {
    return this.store.findRecord('static-page', params.id, params);
  }
}
