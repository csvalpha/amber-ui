import { computed } from '@ember/object';
import { hash } from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import IndexRouteUnauthenticated from 'alpha-amber/routes/application/index';
import PagedModelRouteMixin from 'alpha-amber/mixins/paged-model-route-mixin';

export default IndexRouteUnauthenticated.extend(PagedModelRouteMixin, AuthenticatedRouteMixin, {
  canAccess() {
    return this.can('show lustrum');
  },
  title: 'Lustrum',
  pageActions: [],
  model() {
    const groupId = 23;
    return hash({
      activities: this.store.query('activity', {reload: true, filter: {group: groupId, upcoming: true}}),
      group: this.get('store').findRecord('group', groupId)
    });
  }
});