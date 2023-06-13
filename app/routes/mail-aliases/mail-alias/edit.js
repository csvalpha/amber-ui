import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class MailAliasEditRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Mail alias aanpassen' };

  canAccess(model) {
    return this.abilities.can('edit mail-alias', model);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
