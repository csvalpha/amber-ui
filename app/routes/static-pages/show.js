import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class ShowStaticPagesRoute extends ApplicationRoute {
  get breadcrumb() {
    return { title: this.controller.model.title };
  }

  get pageActions() {
    return [
      {
        link: 'static-pages.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: this.controller.model,
        canAccess: this.abilities.can('edit static-pages'),
      },
      {
        link: 'static-pages.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: this.controller.model,
        canAccess: this.abilities.can('destroy static-pages'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show static-pages');
  }

  model(params) {
    return this.store.findRecord('static-page', params.id, params);
  }
}
