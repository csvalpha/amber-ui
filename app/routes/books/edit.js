import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class EditBookRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Boek aanpassen' };

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
