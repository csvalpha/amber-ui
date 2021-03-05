import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class NewStaticPageRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Informatie pagina aanmaken' }

  canAccess() {
    return this.can.can('create static-pages');
  }

  model() {
    return this.store.createRecord('mail-alias');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
