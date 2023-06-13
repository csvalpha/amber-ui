import { ApplicationRoute } from 'amber-ui/routes/application/application';
import { capitalize } from '@ember/string';
import { inject as service } from '@ember/service';

export default class StaticPagesRoute extends ApplicationRoute {
  @service intl;

  queryParams = {};

  get breadcrumb() {
    return {
      title: capitalize(this.intl.t('model.staticPage.name.other').toString()),
    };
  }
}
