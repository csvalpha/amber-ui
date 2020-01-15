import IndexRouteUnauthenticated from 'alpha-amber/routes/application/index';
import PagedModelRouteMixin from 'alpha-amber/mixins/paged-model-route-mixin';

export default IndexRouteUnauthenticated.extend(PagedModelRouteMixin, {
  canAccess() {
    return this.can('show lustrum');
  },
  title: 'Lustrum',
  pageActions: [],
  model() {
    const groupId = 23; // Group 23 is lustrum commissie
    return this.store.query('activity', { reload: true, sort: 'start_time', filter: { group: groupId, upcoming: true } });
  }
});
