import { ApplicationRoute } from 'alpha-amber/routes/application/application';

export default class PhotoCommentsIndexRoute extends ApplicationRoute {
  breadCrumb = { title: 'Fotoreacties' };

  canAccess() {
    return this.abilities.can('show photo-comments');
  }

  model(params) {
    params.paramMapping = this.paramMapping;
    params.sort = '-updated_at';
    // eslint-disable-next-line camelcase
    params.filter = { with_comments: true };
    params.perPage = 4;
    return this.store.queryPaged('photo', params);
  }
}
