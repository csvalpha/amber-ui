import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class UserResendActivationCodeRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Activatiecode hersturen' };

  canAccess(model) {
    return this.abilities.can('resend activation code of user', model);
  }
}
