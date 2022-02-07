import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class NewStaticPageRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Informatie pagina aanmaken' }

  canAccess() {
    return this.abilities.can('create static-pages');
  }

  model() {
    return this.store.createRecord('static-page');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
