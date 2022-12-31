import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ActivityGenerateAliasRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Creëer mail alias' };

  canAccess(model) {
    return this.abilities.can('generate alias for activity', model);
  }

  async model() {
    const activity = this.modelFor('activities.activity');
    await activity.form;
    return activity;
  }
}
