import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class MandateIndexRoute extends AuthenticatedRoute {
  get pageActions() {
    return [
      {
        link: 'debit.mandates.mandate.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: this.controller.model,
        canAccess: this.abilities.can('edit debit/mandates'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show debit/mandates');
  }
}
