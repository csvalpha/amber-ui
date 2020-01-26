import { computed } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { all } from 'rsvp';
import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  canAccess() {
    return this.can.can('show groups');
  },
  afterModel(group) {
    // This ensures all memberships and users are loaded
    if (this.can.can('show memberships')) {
      return group.get('memberships').then(memberships => {
        return all(memberships.mapBy('user'));
      });
    }
  },
  modelName: 'group',
  title: computed('controller.model.name', function() {
    return this.get('controller.model.name');
  }),
  parents: ['groups.index'],
  pageActions: computed('controller.model', function() {
    const group = this.get('controller.model');
    return [
      {
        link: 'groups.edit',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: group,
        canAccess: this.can.can('edit group', group)
      },
      {
        link: 'groups.export',
        title: 'Gebruikers exporteren',
        icon: 'download',
        linkArgument: group,
        canAccess: this.can.can('export group', group)
      }
    ];
  })
});
