import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default class CollectionsIndexRoute extends AuthenticatedRoute.extend(RouteMixin) {
  breadCrumb = { title: 'Incasso\'s' }

  get pageActions() {
    return [
      {
        link: 'debit.collections.new',
        title: 'Nieuwe incasso',
        icon: 'plus',
        canAccess: this.can.can('create debit/collections')
      }
    ];
  }

  canAccess() {
    return this.can.can('show debit/collections');
  }

  model(params) {
    params.paramMapping = this.paramMapping;
    return this.findPaged('debit/collection', params);
  }
}

