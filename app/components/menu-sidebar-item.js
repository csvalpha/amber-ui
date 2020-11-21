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
    let popup = document.createElement('div');
    popup.appendChild(document.createTextNode(title));
    popup.className = 'menu-sidebar-item-popup';

    element.addEventListener('mouseover', () => {
      if (!layoutManager.leftSideBarExpanded) {
        document.body.appendChild(popup);
        popup.style.top = `${element.getBoundingClientRect().top}px`;
      }
    });
    element.addEventListener('mouseout', () => {
      document.body.removeChild(popup);
    });
  }
});
export default MenuSidebarItemComponent;
