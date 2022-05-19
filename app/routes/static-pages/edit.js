import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class EditStaticPageRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Informatie pagina aanpassen' };

  canAccess() {
    return this.abilities.can('edit static-pages');
  }

  model(params) {
    return this.store.findRecord('static-page', params.id, params);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
