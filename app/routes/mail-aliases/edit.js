import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class EditMailAliasRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Mail-alias aanpassen' }

  canAccess(model) {
    return this.can.can('edit mail-alias', model);
  }

  model(params) {
    return this.store.findRecord('mail-alias', params.id, params);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}

