import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DeclarationRejectRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Afkeuren' };

  canAccess(model) {
    return this.abilities.can('reject declaration', model);
  }

  model() {
    return this.modelFor('declarations.declaration');
  }
}
