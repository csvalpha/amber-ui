import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class EditMailAliasRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Poll aanpassen' };

  canAccess(model) {
    return this.abilities.can('edit poll', model);
  }

  model(params) {
    return this.store.findRecord('poll', params.id, params);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
