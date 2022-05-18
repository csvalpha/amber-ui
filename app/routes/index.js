import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class IndexRoute extends ApplicationRoute {
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
    return true;
  }

  model(params) {
    params.sort = '-pinned,-created_at';
    return this.store.queryPaged('article', params);
  }
}
