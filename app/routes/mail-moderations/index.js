import { ApplicationRoute } from 'alpha-amber/routes/application/application';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default class ModerationIndexRoute extends ApplicationRoute.extend(RouteMixin) {
  breadCrumb = { title: 'Mailmoderatie' }

  canAccess() {
    return this.can.can('show mail-moderations');
  }

  model(params) {
    return this.store.query('stored-mail', params);
  }
}
