import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class MailAliasIndexRoute extends ApplicationRoute {
  breadcrumb = { title: 'Polls' };

  get pageActions() {
    return [
      {
        link: 'polls.new',
        title: 'Nieuwe Poll',
        icon: 'plus',
        canAccess: this.abilities.can('create polls'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show polls');
  }

  model(params) {
    return this.store.queryPaged('poll', params);
  }
}
