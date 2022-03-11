import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class NewBookRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Boek aanmaken' };

  canAccess() {
    return this.abilities.can('create books');
  }

  model() {
    return this.store.createRecord('book');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
