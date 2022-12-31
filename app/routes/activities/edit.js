import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class EdityActivityRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Activiteit aanpassen' };

  canAccess(model) {
    return this.abilities.can('edit activity', model);
  }

  async model(params) {
    const activity = await this.store.findRecord('activity', params.id, params);
    await activity.form;
    return activity;
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributesAndForm();
  }
}
