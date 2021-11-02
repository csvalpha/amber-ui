import { inject as service } from '@ember/service';
import { ApplicationRoute } from 'alpha-amber/routes/application/application';
import FormLoadOrCreateUtil from 'alpha-amber/lib/utils/form-load-or-create';

export default class ShowArticleRoute extends ApplicationRoute {
  @service store;

  constructor() {
    super(...arguments);
    this.formLoadOrCreateUtil = new FormLoadOrCreateUtil(this);
  }

  get breadCrumb() {
    return { title: this.controller.model.title };
  }

  get pageActions() {
    const article = this.controller.model;
    return [
      {
        link: 'articles.edit',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: article,
        canAccess: this.can.can('edit article', article)
      },
      {
        link: 'articles.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: this.controller.model,
        canAccess: this.can.can('destroy articles')
      }
    ];
  }

  canAccess() {
    return this.can.can('show articles');
  }

  model(params) {
    return this.store.findRecord('article', params.id, params);
  }
}
