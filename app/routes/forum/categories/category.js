import { reads } from '@ember/object/computed';
import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  canAccess() {
    return this.can.can('show forum/categories');
  },
  modelName: 'forum/category',
  modelRouteParam: 'category_id',
  title: reads('controller.model.name')
});
