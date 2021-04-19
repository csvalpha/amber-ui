import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class EdityActivityRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Activiteit aanpassen' }

  canAccess(model) {
    return this.can.can('edit activity', model);
  }

  model(params) {
    return this.store.findRecord('activity', params.id, params).then(activity => activity.get('form').then(() => activity));
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributesAndForm();
  }
}
