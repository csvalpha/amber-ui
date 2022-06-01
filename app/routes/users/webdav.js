import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class WebdavRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Contactsynchronisatie' };

  canAccess() {
    return this.abilities.can('show webdav users');
  }
}
