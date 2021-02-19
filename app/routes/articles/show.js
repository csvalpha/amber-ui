import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';
import formLoadOrCreateMixin from 'alpha-amber/mixins/form-load-or-create-mixin';

export default class ShowArticleRoute extends AuthenticatedRoute.extend(formLoadOrCreateMixin) {
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
