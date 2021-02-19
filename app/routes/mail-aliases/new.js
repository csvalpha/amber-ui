import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class NewMailAliasRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Mail-alias aanmaken' }

  canAccess() {
    return this.can.can('create mail-aliases');
  }

  model() {
    return this.store.createRecord('mail-alias');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }

}

