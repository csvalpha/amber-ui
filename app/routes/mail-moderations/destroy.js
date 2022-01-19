import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class DestroyModerationRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Moderatieverzoek negeren' }

  canAccess() {
    return this.abilities.can('destroy mail-moderations');
  }

  model(params) {
    return this.store.findRecord('stored-mail', params.id, params);
  }
}
