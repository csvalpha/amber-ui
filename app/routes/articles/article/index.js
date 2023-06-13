import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class ArticleIndexRoute extends ApplicationRoute {
  get pageActions() {
    const article = this.controller.model;
    return [
      {
        link: 'articles.article.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: article,
        canAccess: this.abilities.can('edit article', article),
      },
      {
        link: 'articles.article.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: this.controller.model,
        canAccess: this.abilities.can('destroy articles'),
      },
    ];
  }
}
