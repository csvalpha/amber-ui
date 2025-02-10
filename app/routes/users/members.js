import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class UsersMembersRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Leden' };

  get pageActions() {
    return [
      {
        link: 'users.new',
        title: 'Nieuw lid',
        icon: 'plus',
        canAccess: this.abilities.can('create users'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show members');
  }

  model(params) {
    params.filter = { group: 'Leden' };
    return this.store.query('user', params);
  }
}
