import { ApplicationRoute } from 'alpha-amber/routes/application/application';

export default class ShowArticleRoute extends ApplicationRoute {
  get breadCrumb() {
    return { title: this.controller.model.title };
  }

  get pageActions() {
    const article = this.controller.model;
    return [
      {
        link: 'articles.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: article,
        canAccess: this.abilities.can('edit article', article),
      },
      {
        link: 'articles.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: this.controller.model,
        canAccess: this.abilities.can('destroy articles'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show articles');
  }

  model(params) {
    return this.store.findRecord('article', params.id, params);
  }
}
