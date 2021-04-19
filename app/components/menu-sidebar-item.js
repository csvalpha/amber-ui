import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MenuSidebarItemComponent extends Component {
  @service layoutManager;

  @tracked minor = false;

  @action
  closeAfterNavigation() {
    if (this.minor) {
      this.layoutManager.closeProfileMenu();
    }

    this.layoutManager.closeLeftSidebarIfOnMobile();
  }

  @action
  showPopup() {
    let { layoutManager, element, title } = this;
    if (!this.popup) {
      this.popup = document.createElement('div');
      this.popup.appendChild(document.createTextNode(title));
      this.popup.className = 'menu-sidebar-item-popup';
    }

    if (!layoutManager.leftSideBarExpanded) {
      document.body.appendChild(this.popup);
      this.popup.style.top = `${element.getBoundingClientRect().top}px`;
    }
  }

  @action
  hidePopup() {
    if (this.popup.parentNode) {
      document.body.removeChild(this.popup);
    }
  }
}
