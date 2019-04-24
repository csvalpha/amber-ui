import { computed } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import IndexRouteUnauthenticated from 'alpha-amber/routes/application/index';
import PagedModelRouteMixin from 'alpha-amber/mixins/paged-model-route-mixin';

export default IndexRouteUnauthenticated.extend(PagedModelRouteMixin, AuthenticatedRouteMixin, {
  canAccess() {
    return this.can('show users');
  },
  modelName: 'user',
  title: 'Gebruikers',
  perPage: 12,
  pageActions: computed(function() {
    return [
      {
        link: 'users.new',
        title: 'Nieuwe gebruiker',
        icon: 'plus',
        canAccess: this.can('create users')
      }, {
        link: 'users.batch.new',
        title: 'Gebruikers importeren vanuit bestand',
        icon: 'upload',
        canAccess: this.can('batch upload users')
      }
    ];
  })
});
