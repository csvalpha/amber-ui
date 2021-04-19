import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class DestroyStaticPageRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Informatie pagina verwijderen' }

  canAccess() {
    return this.can.can('destroy static-pages');
  }

  model(params) {
    return this.store.findRecord('static-page', params.id, params);
  }
}
