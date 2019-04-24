import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  session: service(),
  store: service(),
  model: computed.alias('session.currentUser'),
  isOpen: false,
  actions: {
    save() {
      this.get('model').save();
      this.set('isOpen', false);
    }
  },
  init() {
    this._super(...arguments);
    if (this.get('model.userDetailsSharingPreference') === null || this.get('model.allowTomatoSharing') === null) {
      this.set('isOpen', true);
    } else {
      this.set('isOpen', false);
    }
  }
});
