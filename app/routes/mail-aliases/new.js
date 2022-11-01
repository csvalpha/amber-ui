import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class NewMailAliasRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Mail-alias aanmaken' };

  canAccess() {
    return this.abilities.can('create mail-aliases');
  }

  model() {
    return this.store.createRecord('mail-alias');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
