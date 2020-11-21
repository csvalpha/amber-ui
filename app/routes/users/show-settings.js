import { computed } from '@ember/object';
import UserShowRouteUnauthenticated from 'alpha-amber/routes/users/show';

export default UserShowRouteUnauthenticated.extend({
  skipBeforeModelAccessCheck: true,
  afterModel(user, transition) {
    return this.checkAccessWithPromise(this.can.can('edit user', user), transition);
  },
  pageActions: computed('can', 'controller.model', function() {
    const user = this.controller.model;
    return [
      {
        link: 'users.edit-privacy',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: user,
        canAccess: this.can.can('edit user', user)
      }
    ];
  })
});
