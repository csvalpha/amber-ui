import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import moment from 'moment';

export default Route.extend(ApplicationRouteMixin, {
  session: service(),
  actions: {
    refresh() {
      this.refresh();
    }
  },

  beforeModel() {
    this._super(...arguments);
    moment.locale('nl');
    return this.get('session').loadAndSetCurrentUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this.refresh();
  }
});
