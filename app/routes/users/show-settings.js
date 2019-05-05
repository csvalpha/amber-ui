import { computed } from '@ember/object';
import UserShowRouteUnauthenticated from 'alpha-amber/routes/users/show';

export default UserShowRouteUnauthenticated.extend({
  skipBeforeModelAccessCheck: true,
  afterModel(user, transition) {
    return this.checkAccessWithPromise(this.can('edit user', user), transition);
  },
  pageActions: computed('controller.model', function() {
    const user = this.get('controller.model');
    return [
      {
        link: 'users.edit-privacy',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: user,
        canAccess: this.can('edit user', user)
      }
    ];
  })
});
