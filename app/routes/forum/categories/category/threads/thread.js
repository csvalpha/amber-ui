import { computed } from '@ember/object';
import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  canAccess() {
    return this.can.can('show forum/threads');
  },
  modelName: 'forum/thread',
  modelRouteParam: 'thread_id',
  title: computed('controller.model.title', function() {
    return this.get('controller.model.title');
  })
});
