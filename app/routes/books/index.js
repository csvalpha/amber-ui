import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class IndexBookRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Boeken' };

  queryParams = {
    search: {
      refreshModel: true,
    },
    sort: {
      refreshModel: true,
    },
    page: {
      refreshModel: true,
    },
  };

  get pageActions() {
    return [
      {
        link: 'books.new',
        title: 'Nieuw boek',
        icon: 'plus',
        canAccess: this.abilities.can('create books'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show books');
  }

  model(params) {
    params.perPage = 12;
    return this.store.queryPaged('book', params);
  }
}
