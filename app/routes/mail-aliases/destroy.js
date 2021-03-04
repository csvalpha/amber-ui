import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class DestroyMailAliasRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Mail-alias verwijderen' }

  canAccess() {
    return this.can.can('destroy mail-aliases');
  }

  model(params) {
    return this.store.findRecord('mail-aliases', params.id, params);
  }
}
