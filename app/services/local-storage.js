import Service from '@ember/service';

export default class LocalStorageService extends Service {
  isSupported = null;
  isEnabled = null;

  get isSupportedAndEnabled() {
    return this.isSupported & this.isEnabled;
  }

  constructor() {
    super(...arguments);

    // Source: http://stackoverflow.com/a/16427725
    if (typeof localStorage === 'undefined') {
      this.isSupported = false;
    } else {
      try {
        localStorage.setItem('feature_test', 'yes');
        if (localStorage.getItem('feature_test') === 'yes') {
          localStorage.removeItem('feature_test');
          this.isSupported = true;
          this.isEnabled = true;
        } else {
          this.isSupported = true;
          this.isEnabled = false;
        }
      } catch(error) {
        this.isSupported = true;
        this.isEnabled = false;
      }
    }

    super.init(...arguments);
  }

  getItem(key) {
    if (this.isSupportedAndEnabled) {
      return localStorage.getItem(key);
    }

    return null;
  }

  setItem(key, value) {
    if (this.isSupportedAndEnabled) {
      localStorage.setItem(key, value);
      return true;
    }

    return false;
  }
}
