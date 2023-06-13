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

  model(params) {
    params.sort = `-pinned,${params.sort}`;
    return this.store.queryPaged('article', params);
  }
}
