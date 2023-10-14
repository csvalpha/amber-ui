import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class MailModerationRoute extends AuthenticatedRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller?.model.subject };
  }

  canAccess() {
    return this.abilities.can('show mail-moderations');
  }

  model(params) {
    return this.store.findRecord('stored-mail', params.id, params);
  }
}
