import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DestroyMailAliasRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Mail-alias verwijderen' };

  canAccess() {
    return this.abilities.can('destroy mail-aliases');
  }

  model(params) {
    return this.store.findRecord('mail-aliases', params.id, params);
  }
}
