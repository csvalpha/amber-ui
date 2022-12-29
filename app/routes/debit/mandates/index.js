import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class MandatesIndexRoute extends AuthenticatedRoute {
  get pageActions() {
    return [
      {
        link: 'debit.mandates.new',
        title: 'Nieuwe mandaat',
        icon: 'plus',
        canAccess: this.abilities.can('create debit/mandates'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show debit/mandates');
  }

  model(params) {
    return this.store.queryPaged('debit/mandate', params);
  }
}
