import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class EditBookRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Boek aanpassen' }

  canAccess(model) {
    return this.abilities.can('edit book', model);
  }

  model(params) {
    return this.store.findRecord('book', params.id, params);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
