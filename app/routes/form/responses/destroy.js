import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DestroyFormResponseRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Formulierantwoord verwijderen' };

  canAccess(model) {
    return this.abilities.can('destroy form/response', model);
  }

  model(params) {
    return this.store.findRecord('form/response', params.id, params);
  }
}
