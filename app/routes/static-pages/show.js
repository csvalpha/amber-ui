import { ApplicationRoute } from 'alpha-amber/routes/application/application';

export default class ShowStaticPagesRoute extends ApplicationRoute {
  get breadCrumb() {
    return { title: this.controller.model.title };
  }

  get pageActions() {
    return [
      {
        link: 'static-pages.edit',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: this.controller.model,
        canAccess: this.can.can('edit static-pages')
      },
      {
        link: 'static-pages.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: this.controller.model,
        canAccess: this.can.can('destroy static-pages')
      }
    ];
  }

  canAccess() {
    return this.can.can('show static-pages');
  }

  model(params) {
    return this.store.findRecord('static-page', params.id, params);
  }
}
