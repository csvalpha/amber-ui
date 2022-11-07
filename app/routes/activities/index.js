import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ActivitiesIndexRoute extends AuthenticatedRoute {
  queryParams = {
    search: {
      refreshModel: true,
    },
    sort: {
      refreshModel: true,
    },
    showPassed: {
      refreshModel: true,
    },
    page: {
      refreshModel: true,
    },
  };

  get pageActions() {
    return [
      {
        link: 'activities.new',
        title: 'Nieuwe activiteit',
        icon: 'plus',
        canAccess: this.abilities.can('create activities'),
      },
      {
        link: 'activities.ical',
        title: 'iCal link',
        icon: 'calendar-days',
        canAccess: this.abilities.can('show ical activities'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show activities');
  }

  model(params) {
    if (!params.showPassed) {
      params.filter = { upcoming: true };
    }

    return this.store.queryPaged('activity', params);
  }
}
