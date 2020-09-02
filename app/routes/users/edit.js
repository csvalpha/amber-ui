import EditRoute from 'alpha-amber/routes/application/edit';
import { computed } from '@ember/object';

export default EditRoute.extend({
  skipBeforeModelAccessCheck: true,
  afterModel(user, transition) {
    return this.checkAccessWithPromise(this.can.can('edit user', user), transition);
  },
  modelName: 'user',
  title: 'Lid aanpassen',
  parents: ['users.index'],
  tabItems: computed('can', 'controller.model', 'session.currentUser', function() {
    const user = this.controller.model;
    return [
      {
        link: 'users.edit',
        title: 'Algemeen',
        linkArgument: user,
        canAccess: true
      },
      {
        link: 'users.edit-permissions',
        title: 'Rechten',
        linkArgument: user,
        canAccess: this.can.can('create permissions-users')
      },
      {
        link: 'users.edit-privacy',
        title: 'Privacy',
        linkArgument: user,
        canAccess: this.session.currentUser === user
      },
      {
        link: 'users.edit-security',
        title: 'Beveiliging',
        linkArgument: user,
        canAccess: this.session.currentUser === user
      }
    ];
  })
});

