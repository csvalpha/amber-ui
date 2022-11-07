import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class BooksIndexRoute extends AuthenticatedRoute {
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
