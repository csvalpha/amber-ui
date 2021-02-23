import { ApplicationRoute } from 'alpha-amber/routes/application/application';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default class IndexRoute extends ApplicationRoute.extend(RouteMixin) {
  get pageActions() {
    return [
      {
        link: 'articles.new',
        title: 'Nieuw artikel',
        icon: 'plus',
        canAccess: this.can.can('create articles')
      }
    ];
  }

  canAccess() {
    return true;
  }

  model(params) {
    params.paramMapping = this.paramMapping;
    params.sort = '-pinned,-created_at';
    return this.findPaged('article', params);
  }
}
