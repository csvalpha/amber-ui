import { ApplicationRoute } from 'alpha-amber/routes/application/application';

export default class ModerationIndexRoute extends ApplicationRoute {
  breadCrumb = { title: 'Mailmoderatie' }

  canAccess() {
    return this.can.can('show mail-moderations');
  }

  model(params) {
    return this.store.query('stored-mail', params);
  }
}
