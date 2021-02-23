import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class EditStaticPageRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Informatie pagina aanpassen' }

  canAccess() {
    return this.can.can('edit static-pages');
  }

  model(params) {
    return this.store.findRecord('static-page', params.id, params);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
