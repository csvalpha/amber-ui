import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DeclarationIndexRoute extends AuthenticatedRoute {
  get pageActions() {
    const declaration = this.controller.model;
    return [
      {
        link: 'declarations.declaration.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: declaration,
        canAccess: this.abilities.can('edit content declaration', declaration),
      },
      {
        link: 'declarations.declaration.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: declaration,
        canAccess: this.abilities.can('destroy declaration', declaration),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show declarations');
  }

  model() {
    return this.modelFor('declarations.declaration');
  }
}
