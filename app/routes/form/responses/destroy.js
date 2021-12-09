import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class DestroyFormResponseRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Formulierantwoord verwijderen' }

  canAccess(model) {
    return this.abilities.can('destroy form/response', model);
  }

  model(params) {
    return this.store.findRecord('form/response', params.id, params);
  }
}
