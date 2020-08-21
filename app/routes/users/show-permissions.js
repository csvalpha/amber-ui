import { computed } from '@ember/object';
import UserShowRouteUnauthenticated from 'alpha-amber/routes/users/show';

export default UserShowRouteUnauthenticated.extend({
  canAccess() {
    return this.can.can('show permissions-users');
  },
  pageActions: computed('can', 'controller.model', function() {
    const user = this.controller.model;
    return [
      {
        link: 'users.edit-permissions',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: user,
        canAccess: this.can.can('edit user', user)
      }
    ];
  })
});
