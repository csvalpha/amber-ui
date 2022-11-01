import { ApplicationRoute } from 'amber-ui/routes/application/application';
import { inject as service } from '@ember/service';
import { capitalize } from '@ember/string';

export default class StaticPagesIndexRoute extends ApplicationRoute {
  @service intl;

  get breadcrumb() {
    return {
      title: capitalize(this.intl.t('model.staticPage.name.other').toString()),
    };
  }

  get pageActions() {
    return [
      {
        link: 'static-pages.new',
        title: 'Nieuwe infopagina',
        icon: 'plus',
        canAccess: this.abilities.can('create static-pages'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show static-pages');
  }

  model(params) {
    return this.store.query('static-page', params);
  }
}
