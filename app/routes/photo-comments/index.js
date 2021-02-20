import { ApplicationRoute } from 'alpha-amber/routes/application/application';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default class PhotoCommentsIndexRoute extends ApplicationRoute.extend(RouteMixin) {
  breadCrumb = { title: 'Fotoreacties' }
  perPage = 4

  canAccess() {
    return this.can.can('show photo-comments');
  }

  model(params) {
    params.paramMapping = this.paramMapping;
    params.sort = '-updated_at';
    // eslint-disable-next-line camelcase
    params.filter = { with_comments: true };
    return this.findPaged('photo', params);
  }
}
