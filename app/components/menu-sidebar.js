import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  layoutManager: service('layout-manager'),
  session: service(),
  actions: {
    invalidateSession() {
      this.session.invalidate();
    }
  }
});
