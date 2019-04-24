import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  canAccess() {
    return this.can('show forum/categories');
  },
  modelName: 'forum/category',
  beforeModel() {
    this.transitionTo('forum.categories.category.threads');
  }
});
