import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class ArticlesIndexRoute extends ApplicationRoute {
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
