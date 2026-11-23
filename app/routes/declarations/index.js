import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DeclarationsIndexRoute extends AuthenticatedRoute {
  queryParams = {
    search: { refreshModel: true },
    sort: { refreshModel: true },
    page: { refreshModel: true },
    status: { refreshModel: true },
  };

  get pageActions() {
    return [
      {
        link: 'declarations.new',
        title: 'Nieuwe declaratie',
        icon: 'plus',
        canAccess: this.abilities.can('create declarations'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show declarations');
  }

  // The API only returns the declarations of the current user, unless they have declaration.read
  model(params) {
    const { status, ...queryParams } = params;
    if (status) {
      queryParams.filter = { status };
    }
    return this.store.queryPaged('declaration', queryParams);
  }
}
