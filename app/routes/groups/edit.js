import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class NewGroupRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Groep aanpassen' };

  canAccess(model) {
    return this.abilities.can('edit group', model);
  }

  model(params) {
    return this.store.findRecord('group', params.id, params);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributesAndMemberships();
  }
}
