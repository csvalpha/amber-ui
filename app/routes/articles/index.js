import { ApplicationRoute } from 'alpha-amber/routes/application/application';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { capitalize } from '@ember/string';
import { inject as service } from '@ember/service';

export default class ArticlesIndexRoute extends ApplicationRoute.extend(RouteMixin) {
  @service intl

  get breadCrumb() {
    return { title: capitalize(this.intl.t('model.article.name.other').toString()) };
  }

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
    return this.can.can('show articles');
  }

  model(params) {
    params.paramMapping = this.paramMapping;
    params.sort = `-pinned,${params.sort}`;
    return this.findPaged('article', params);
  }
}
