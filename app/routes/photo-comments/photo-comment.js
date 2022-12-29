import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class PhotoCommentRoute extends AuthenticatedRoute {
  queryParams = {};

  canAccess() {
    return this.abilities.can('show photo-comments');
  }

  model(params) {
    return this.store.findRecord('photo-comment', params.id, params);
  }
}
