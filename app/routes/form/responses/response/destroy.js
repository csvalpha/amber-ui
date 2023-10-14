import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ResponseDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Formulierantwoord verwijderen' };

  canAccess(model) {
    return this.abilities.can('destroy form/responses', model);
  }
}
