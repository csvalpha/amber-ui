import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';
import { assign } from '@ember/polyfills';

export default class UserIndexRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Gebruikers' }
  perPage = 12

  get pageActions() {
    return [
      {
        link: 'users.new',
        title: 'Nieuwe gebruiker',
        icon: 'plus',
        canAccess: this.can.can('create users')
      }, {
        link: 'users.batch.new',
        title: 'Gebruikers importeren vanuit bestand',
        icon: 'upload',
        canAccess: this.can.can('batch upload users')
      }
    ];
  }

  canAccess() {
    return this.can.can('show users');
  }

  model(params) {
    params = assign({ 'filter': { 'archived': false } }, params);
    params.perPage = 12;
    return this.store.queryPaged('user', params);
  }
}

