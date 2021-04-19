import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class WebdavRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Contactsynchronisatie' }

  canAccess() {
    return this.can.can('show webdav users');
  }
}
