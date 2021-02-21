import { ApplicationRoute } from 'alpha-amber/routes/application/application';
import { inject as service } from '@ember/service';
import { capitalize } from '@ember/string';

export default class StaticPagesIndexRoute extends ApplicationRoute {
  @service intl

  get breadCrumb() {
    return { title: capitalize(this.intl.t('model.staticPage.name.other').toString()) };
  }

  get pageActions() {
    return [
      {
        link: 'static-pages.new',
        title: 'Nieuwe infopagina',
        icon: 'plus',
        canAccess: this.can.can('create static-pages')
      }
    ];
  }

  canAccess() {
    return this.can.can('show static-pages');
  }

  model(params) {
    return this.store.query('static-page', params);
  }
}
