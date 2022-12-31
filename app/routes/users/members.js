import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class MembersRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Leden' };

  get pageActions() {
    return [
      {
        link: 'users.new',
        title: 'Nieuw lid',
        icon: 'plus',
        canAccess: this.abilities.can('create users'),
      },
      {
        link: 'users.webdav',
        title: 'Contactsynchronisatie',
        icon: 'address-book',
        canAccess: this.abilities.can('show webdav users'),
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
