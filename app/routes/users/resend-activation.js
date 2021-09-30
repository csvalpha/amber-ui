import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class ResendActivationRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Activatiecode hersturen' }

  canAccess(model) {
    return this.can.can('resend activation code of user', model);
  }

  model(params) {
    return this.store.findRecord('user', params.id, params);
  }
}
