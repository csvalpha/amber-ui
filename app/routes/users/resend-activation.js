import { computed } from '@ember/object';
import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  skipBeforeModelAccessCheck: true,
  afterModel(user, transition) {
    return this.checkAccessWithPromise(this.can.can('resend activation code of user', user), transition);
  },
  modelName: 'user',
  title: computed('controller.model.fullName', function() {
    return `Activatiecode hersturen van ${this.get('controller.model.fullName')}`;
  })
});
