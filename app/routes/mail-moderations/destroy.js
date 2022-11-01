import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DestroyModerationRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Moderatieverzoek negeren' };

  canAccess() {
    return this.abilities.can('destroy mail-moderations');
  }

  model(params) {
    return this.store.findRecord('stored-mail', params.id, params);
  }
}
