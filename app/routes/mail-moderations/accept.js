import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class AcceptModerationRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Moderatieverzoek goedkeuren' }

  canAccess() {
    return this.can.can('accept mail-moderations');
  }

  model(params) {
    return this.store.findRecord('stored-mail', params.id, params);
  }
}
