import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class PostRoute extends AuthenticatedRoute {
  queryParams = {};

  canAccess() {
    return this.abilities.can('show forum/posts');
  }

  model(params) {
    return this.store.findRecord('forum/post', params.post_id, params);
  }
}
