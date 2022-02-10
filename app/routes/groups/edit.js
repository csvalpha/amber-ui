import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class NewGroupRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Groep aanpassen' };

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
