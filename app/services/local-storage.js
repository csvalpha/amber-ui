import Service from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({
  isSupported: null,
  isEnabled: null,
  isSupportedAndEnabled: computed('isSupported', 'isEnabled', function() {
    return this.isSupported & this.isEnabled;
  }),

  init() {
    // Source: http://stackoverflow.com/a/16427725
    if (typeof localStorage === 'undefined') {
      this.set('isSupported', false);
    } else {
      try {
        localStorage.setItem('feature_test', 'yes');
        if (localStorage.getItem('feature_test') === 'yes') {
          localStorage.removeItem('feature_test');
          this.set('isSupported', true);
          this.set('isEnabled', true);
        } else {
          this.set('isSupported', true);
          this.set('isEnabled', false);
        }
      } catch(error) {
        this.set('isSupported', true);
        this.set('isEnabled', false);
      }
    }

    this._super(...arguments);
  },

  getItem(key) {
    if (this.isSupportedAndEnabled) {
      return localStorage.getItem(key);
    }

    return null;
  },

  setItem(key, value) {
    if (this.isSupportedAndEnabled) {
      localStorage.setItem(key, value);
      return true;
    }

    return false;
  }

});
