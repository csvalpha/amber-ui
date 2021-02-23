import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default class MandatesRoute extends AuthenticatedRoute.extend(RouteMixin) {
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
    params.paramMapping = this.paramMapping;
    return this.findPaged('debit/mandate', params);
  }
}

