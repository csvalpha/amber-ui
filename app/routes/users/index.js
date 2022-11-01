import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class UserIndexRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Gebruikers' };

  get pageActions() {
    return [
      {
        link: 'users.new',
        title: 'Nieuwe gebruiker',
        icon: 'plus',
        canAccess: this.abilities.can('create users'),
      },
      {
        link: 'users.batch.new',
        title: 'Gebruikers importeren vanuit bestand',
        icon: 'upload',
        canAccess: this.abilities.can('batch upload users'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show users');
  }

  model(params) {
    params.perPage = 12;
    return this.store.queryPaged('user', params);
  }
}
