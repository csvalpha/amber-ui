import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  layoutManager: service('layout-manager'),
  session: service(),
  actions: {
    toggleLeftSidebarExpansion() {
      this.layoutManager.toggleLeftSidebarExpansion();
    },
    invalidateSession() {
      this.session.invalidate();
    },
    toggleProfileMenu() {
      this.layoutManager.toggleProfileMenu();
    },
    closeProfileMenu() {
      this.layoutManager.closeProfileMenu();
    },
    closeLeftSidebar() {
      this.layoutManager.closeLeftSidebar();
    },
    openProfileMenu() {
      this.layoutManager.openProfileMenu();
    }
  }
});
