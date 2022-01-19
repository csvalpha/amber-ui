import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class DestroyPostRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Forumbericht verwijderen' }

  canAccess() {
    return this.abilities.can('destroy forum/posts');
  }

  model(params) {
    return this.store.findRecord('forum/post', params.post_id, params);
  }
}
