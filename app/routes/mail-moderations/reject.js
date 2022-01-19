import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class RejectModerationRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Moderatieverzoek afwijzen' }

  canAccess() {
    return this.abilities.can('reject mail-moderations');
  }

  model(params) {
    return this.store.findRecord('stored-mail', params.id, params);
  }
}
