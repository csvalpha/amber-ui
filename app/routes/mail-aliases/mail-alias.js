import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class MailAliasRoute extends AuthenticatedRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller?.model.email };
  }

  canAccess() {
    return this.abilities.can('show mail-aliases');
  }

  model(params) {
    return this.store.findRecord('mail-alias', params.id, params);
  }
}
