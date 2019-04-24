import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import IndexRouteUnauthenticated from 'alpha-amber/routes/application/index';
import PagedModelRouteMixin from 'alpha-amber/mixins/paged-model-route-mixin';

export default IndexRouteUnauthenticated.extend(PagedModelRouteMixin, AuthenticatedRouteMixin, {
  canAccess() {
    return this.can('show photo-comments');
  },
  modelName: 'photo',
  title: 'Fotoreacties',
  perPage: 4,
  model(params) {
    params.paramMapping = this.get('paramMapping');
    params.sort = '-updated_at';
    // eslint-disable-next-line camelcase
    params.filter = { with_comments: true };
    return this.findPaged(this.get('modelName'), params);
  }
});
