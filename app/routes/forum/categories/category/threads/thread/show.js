import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  canAccess() {
    return this.can.can('show forum/threads');
  },
  modelName: 'forum/thread',
  beforeModel() {
    this.transitionTo('forum.categories.category.threads.thread.posts');
  }
});
