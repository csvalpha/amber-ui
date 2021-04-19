import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class EditStaticPageRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Batch gebruikers uploaden' }

  canAccess() {
    return this.can.can('batch upload users');
  }

  model() {
    return this.store.createRecord('user');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
