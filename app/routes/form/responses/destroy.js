import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  skipBeforeModelAccessCheck: true,
  afterModel(response, transition) {
    return this.checkAccessWithPromise(this.can.can('destroy form/response', response), transition);
  },
  modelName: 'form/response',
  title: 'Formulierantwoord verwijderen'
});
