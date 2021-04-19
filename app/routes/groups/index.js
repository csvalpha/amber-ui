import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class GroupIndexRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Groepen' }

  queryParams = {
    search: {
      refreshModel: true
    },
    sort: {
      refreshModel: true
    },
    selectedGroupKind: {
      refreshModel: true
    },
    showAdministrative: {
      refreshModel: true
    },
    showInactive: {
      refreshModel: true
    }
  }

  get pageActions() {
    return [
      {
        link: 'groups.new',
        title: 'Nieuwe groep',
        icon: 'plus',
        canAccess: this.can.can('create groups')
      }
    ];
  }

  canAccess() {
    return this.can.can('show groups');
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
