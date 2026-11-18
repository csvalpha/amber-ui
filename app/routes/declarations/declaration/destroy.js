import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DeclarationDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Verwijderen' };

  canAccess(model) {
    return this.abilities.can('destroy declaration', model);
  }

  model() {
    return this.modelFor('declarations.declaration');
  }
}
