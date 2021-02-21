import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class PrintEnrolledRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Print inschrijvingen/streeplijst' };

  canAccess(model) {
    return this.can.can('edit activity', model);
  }

  model(params) {
    return this.store.findRecord('activity', params.id, params);
  }
}
