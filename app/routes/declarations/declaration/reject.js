import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DeclarationRejectRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Afkeuren' };

  canAccess(model) {
    return this.abilities.can('reject declaration', model);
  }

  model() {
    return this.modelFor('declarations.declaration');
  }

  // Keep a draft reason for the same declaration, but don't carry it over to another one
  setupController(controller, model) {
    if (controller.model !== model) {
      controller.resetDraft();
    }
    super.setupController(controller, model);
  }
}
