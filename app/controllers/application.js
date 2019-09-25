import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  session: service(),
  layoutManager: service('layout-manager'),
  actions: {
    invalidateSession() {
      this.session.invalidate();
    },
    refreshItems() {
      this.send('refresh');
    }
  }
});
