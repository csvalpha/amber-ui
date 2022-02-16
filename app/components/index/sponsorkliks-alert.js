import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SponsorkliksAlertComponent extends Component {
  localStorage = service();

  extensionInstalled =
    document.documentElement.dataset.sponsorkliksExtension === '1';

  popupClosed =
    localStorage.getItem('sponsorkliksExtensionPopupClosed') === 'true';

  isFirefox = typeof InstallTrigger !== 'undefined';

  isChrome =
    !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

  showAlert =
    !this.extensionInstalled &&
    (this.isFirefox || this.isChrome) &&
    !this.popupClosed;

  @action
  closePopup() {
    localStorage.setItem('sponsorkliksExtensionPopupClosed', true);
    set(this, 'showAlert', false);
  }
}
