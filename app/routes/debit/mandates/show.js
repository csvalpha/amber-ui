import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class CollectionsIndexRoute extends AuthenticatedRoute {
  get breadCrumb() {
    return { title: this.controller.model.id };
  }

  get pageActions() {
    return [
      {
        link: 'debit.mandates.edit',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: this.controller.model,
        canAccess: this.can.can('edit debit/mandates')
      }
    ];
  }

  canAccess() {
    return this.can.can('show debit/mandates');
  }

  model(params) {
    return this.store.findRecord('debit/mandate', params.id, params);
  }
}
