import { ApplicationRoute } from 'alpha-amber/routes/application/application';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { inject as service } from '@ember/service';

export default class ArticlesIndexRoute extends ApplicationRoute.extend(RouteMixin) {
  @service intl
  breadCrumb = { title: 'Mail-aliassen' }

  get pageActions() {
    return [
      {
        link: 'mail-aliases.new',
        title: 'Nieuw mailalias',
        icon: 'plus',
        canAccess: this.can.can('create mail-aliases')
      }
    ];
  }

  canAccess() {
    return this.can.can('show mail-aliases');
  }

  model(params) {
    return this.store.query('mail-alias', params);
  }
}

