import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class PhotoCommentsIndexRoute extends AuthenticatedRoute {
  canAccess() {
    return this.abilities.can('show photo-comments');
  }

  model(params) {
    /* eslint-disable camelcase */
    params = {
      ...params,
      paramMapping: this.paramMapping,
      sort: '-updated_at',
      filter: { with_comments: true },
      perPage: 4,
    };
    /* eslint-enable camelcase */

    return this.store.queryPaged('photo', params);
  }
}
