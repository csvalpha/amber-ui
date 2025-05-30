import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class GroupsIndexRoute extends AuthenticatedRoute {
  queryParams = {
    search: {
      refreshModel: true,
    },
    sort: {
      refreshModel: true,
    },
    selectedGroupKind: {
      as: 'kind',
      refreshModel: true,
    },
    showAdministrative: {
      as: 'administrative',
      refreshModel: true,
    },
    showInactive: {
      as: 'inactive',
      refreshModel: true,
    },
  };

  get pageActions() {
    return [
      {
        link: 'groups.new',
        title: 'Nieuwe groep',
        icon: 'plus',
        canAccess: this.abilities.can('create groups'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show groups');
  }

  model(params) {
    if (!params.filter) {
      params.filter = {};
    }

    if (params.search) {
      params.filter.search = params.search;
    } else if (params.selectedGroupKind) {
      params.filter.kind = params.selectedGroupKind;
    }

    if (!params.showAdministrative) {
      params.filter.administrative = false;
    }

    if (!params.showInactive) {
      params.filter.active = true;
    }

    delete params.selectedGroupKind;
    delete params.showAdministrative;
    delete params.showInactive;
    delete params.search;
    return this.store.query('group', params);
  }
}
