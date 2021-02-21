import { ApplicationRoute } from 'alpha-amber/routes/application/application';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default class MailAliasIndexRoute extends ApplicationRoute.extend(RouteMixin) {
  breadCrumb = { title: 'Polls' }

  get pageActions() {
    return [
      {
        link: 'polls.new',
        title: 'Nieuwe Poll',
        icon: 'plus',
        canAccess: this.can.can('create polls')
      }
    ];
  }

  canAccess() {
    return this.can.can('show polls');
  }

  model(params) {
    params.paramMapping = this.paramMapping;
    return this.findPaged('poll', params);
  }
}

