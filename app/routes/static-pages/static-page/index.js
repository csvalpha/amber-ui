import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class StaticPageIndexRoute extends ApplicationRoute {
  get pageActions() {
    return [
      {
        link: 'static-pages.static-page.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: this.controller.model,
        canAccess: this.abilities.can('edit static-pages'),
      },
      {
        link: 'static-pages.static-page.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: this.controller.model,
        canAccess: this.abilities.can('destroy static-pages'),
      },
    ];
  }
}
