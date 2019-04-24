import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  layoutManager: service('layout-manager'),
  session: service(),
  tooltipDelay: 200,
  tooltipSpacing: 25,
  actions: {
    toggleLeftSidebarExpansion() {
      this.get('layoutManager').toggleLeftSidebarExpansion();
    },
    invalidateSession() {
      this.get('session').invalidate();
    },
    toggleProfileMenu() {
      this.get('layoutManager').toggleProfileMenu();
    },
    closeProfileMenu() {
      this.get('layoutManager').closeProfileMenu();
    },
    closeLeftSidebar() {
      this.get('layoutManager').closeLeftSidebar();
    },
    openProfileMenu() {
      this.get('layoutManager').openProfileMenu();
    }
  }
});
