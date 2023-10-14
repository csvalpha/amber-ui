import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class StaticPagesIndexRoute extends ApplicationRoute {
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

  model(params) {
    return this.store.query('static-page', params);
  }
}
