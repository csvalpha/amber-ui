import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  store: service(),
  flashNotice: service('flash-notice'),
  willDestroyElement() {
    this._super(...arguments);
    this.set('content', '');
  },
  actions: {
    save(message, thread) {
      this.store.createRecord('forum/post', {
        message,
        thread
      }).save().then(() => {
        this.flashNotice.sendSuccess('Forumbericht toegevoegd!');
        this.set('content', '');
        this.onSubmit();
      });
    },
    cancel() {
      this.set('content', '');
    }
  }
});
