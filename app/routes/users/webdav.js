import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class WebdavRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Contactsynchronisatie' };

  canAccess() {
    return this.abilities.can('show webdav users');
  }
}
