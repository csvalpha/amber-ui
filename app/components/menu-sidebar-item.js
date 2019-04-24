import Component from '@ember/component';
import { inject as service } from '@ember/service';

const MenuSidebarItemComponent = Component.extend({
  layoutManager: service('layout-manager'),
  minor: false,
  actions: {
    closeAfterNavigation() {
      if (this.get('minor')) {
        this.get('layoutManager').closeProfileMenu();
      }
      this.get('layoutManager').closeLeftSidebarIfOnMobile();
    }
  }
});
export default MenuSidebarItemComponent;
