import { ApplicationRoute } from 'amber-ui/routes/application/application';
import { capitalize } from '@ember/string';
import { inject as service } from '@ember/service';

export default class ArticlesIndexRoute extends ApplicationRoute {
  @service intl;

  get breadcrumb() {
    return {
      title: capitalize(this.intl.t('model.article.name.other').toString()),
    };
  }

  get pageActions() {
    return [
      {
        link: 'articles.new',
        title: 'Nieuw artikel',
        icon: 'plus',
        canAccess: this.abilities.can('create articles'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show articles');
  }

  model(params) {
    params.sort = `-pinned,${params.sort}`;
    return this.store.queryPaged('article', params);
  }
}
