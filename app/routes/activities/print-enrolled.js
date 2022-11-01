import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class PrintEnrolledRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Print inschrijvingen/streeplijst' };

  canAccess(model) {
    return this.abilities.can('edit activity', model);
  }

  model(params) {
    return this.store.findRecord('activity', params.id, params);
  }
}
