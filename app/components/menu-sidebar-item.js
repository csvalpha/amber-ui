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
    this._super(...arguments);
    let { layoutManager, element, title } = this;

    if (!this.popup) {
      this.popup = document.createElement('div');
      this.popup.appendChild(document.createTextNode(title));
      this.popup.className = 'menu-sidebar-item-popup';

      element.addEventListener('mouseover', () => {
        if (!layoutManager.leftSideBarExpanded) {
          document.body.appendChild(this.popup);
          this.popup.style.top = `${element.getBoundingClientRect().top}px`;
        }
      });
      element.addEventListener('mouseout', () => {
        if (this.popup.parentNode) {
          document.body.removeChild(this.popup);
        }
      });
    }
  }
});
export default MenuSidebarItemComponent;
