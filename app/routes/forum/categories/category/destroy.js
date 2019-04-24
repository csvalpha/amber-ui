import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  canAccess() {
    return this.can('destroy forum/categories');
  },
  model() {
    return this.modelFor('forum.categories.category');
  },
  modelName: 'forum/category',
  title: 'Categorie verwijderen'
});
