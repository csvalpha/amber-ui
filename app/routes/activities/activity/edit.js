import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ActivityEditRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Activiteit aanpassen' };

  canAccess(model) {
    return this.abilities.can('edit activity', model);
  }

  async model() {
    const activity = this.modelFor('activities.activity');
    await activity.form;
    return activity;
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributesAndForm();
  }
}
