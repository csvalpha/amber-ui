import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class UsersWebdavRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Contactsynchronisatie' };

  canAccess() {
    return this.abilities.can('show webdav users');
  }
}
