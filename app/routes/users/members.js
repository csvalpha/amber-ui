import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class MembersRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Leden' }

  get pageActions() {
    return [
      {
        link: 'users.new',
        title: 'Nieuw lid',
        icon: 'plus',
        canAccess: this.can.can('create users')
      },
      {
        link: 'users.webdav',
        title: 'Contactsynchronisatie',
        icon: 'address-book',
        canAccess: this.can.can('show webdav users')
      }
    ];
  }

  canAccess() {
    return this.can.can('show members');
  }

  model(params) {
    params.filter = { group: 'Leden' };
    return this.store.query('user', params);
  }
}
