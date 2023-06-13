import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class MailModerationsIndexRoute extends AuthenticatedRoute {
  canAccess() {
    return this.abilities.can('show mail-moderations');
  }

  model(params) {
    return this.store.query('stored-mail', params);
  }
}
