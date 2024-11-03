import { ApplicationRoute } from 'amber-ui/routes/application/application';
import { capitalize } from '@ember/string';
import { inject as service } from '@ember/service';

export default class ArticlesRoute extends ApplicationRoute {
  @service intl;

  queryParams = {};

  get breadcrumb() {
    return {
      title: capitalize(this.intl.t('model.article.name.other').toString()),
    };
  }
}
