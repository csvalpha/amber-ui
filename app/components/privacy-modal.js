import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  session: service(),
  store: service(),
  model: alias('session.currentUser'),
  isOpen: false,
  actions: {
    save() {
      this.model.save();
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
