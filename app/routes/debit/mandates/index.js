import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class MandatesRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Incasso mandaten' }

  get pageActions() {
    return [
      {
        link: 'debit.mandates.new',
        title: 'Nieuwe mandaat',
        icon: 'plus',
        canAccess: this.can.can('create debit/mandates')
      }
    ];
  }

  canAccess() {
    return this.can.can('show debit/mandates');
  }

  model(params) {
    return this.store.queryPaged('debit/mandate', params);
  }
}
