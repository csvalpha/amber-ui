import { ApplicationRoute } from 'alpha-amber/routes/application/application';

export default class MailAliasIndexRoute extends ApplicationRoute {
  breadCrumb = { title: 'Polls' }

  get pageActions() {
    return [
      {
        link: 'polls.new',
        title: 'Nieuwe Poll',
        icon: 'plus',
        canAccess: this.can.can('create polls')
      }
    ];
  }

  canAccess() {
    return this.can.can('show polls');
  }

  model(params) {
    return this.store.queryPaged('poll', params);
  }
}
