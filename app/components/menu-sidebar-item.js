import Component from '@ember/component';
import { inject as service } from '@ember/service';

const MenuSidebarItemComponent = Component.extend({
  layoutManager: service('layout-manager'),
  minor: false,
  actions: {
    closeAfterNavigation() {
      if (this.minor) {
        this.layoutManager.closeProfileMenu();
      }

      this.layoutManager.closeLeftSidebarIfOnMobile();
    }
  }
});
export default MenuSidebarItemComponent;
