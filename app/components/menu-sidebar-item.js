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
  },
  didRender() {
    let { layoutManager, element, title } = this;
    let popup;
    element.addEventListener('mouseover', () => {
      if (!layoutManager.leftSideBarExpanded && !popup) {
        popup = document.createElement('div');
        popup.appendChild(document.createTextNode(title));
        document.body.appendChild(popup);
        popup.className = 'menu-sidebar-item-popup';
        popup.style.top = `${element.getBoundingClientRect().top}px`;
      }
    });
    element.addEventListener('mouseout', () => {
      if (popup) {
        document.body.removeChild(popup);
        popup = null;
      }
    });
  }
});
export default MenuSidebarItemComponent;
