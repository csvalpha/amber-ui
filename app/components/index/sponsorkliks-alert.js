import Component from '@glimmer/component';

export default class SponsorkliksAlertComponent extends Component {
  extensionInstalled = document.documentElement.dataset.sponsorkliksExtension === '1';

  isFirefox = typeof InstallTrigger !== 'undefined';

  isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

  showAlert = !this.extensionInstalled && (this.isFirefox || this.isChrome)
}
