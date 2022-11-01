import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class AcceptModerationRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Moderatieverzoek goedkeuren' };

  canAccess() {
    return this.abilities.can('accept mail-moderations');
  }

  model(params) {
    return this.store.findRecord('stored-mail', params.id, params);
  }
}
