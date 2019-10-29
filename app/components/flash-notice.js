import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { observer } from '@ember/object';

export default Component.extend({
  flashNotice: service('flash-notice'),
  flashNoticeVisibility: null,
  flashNoticeStatus: null,
  flashNoticeContent: null,
  flashNoticeIsPermanent: null,
  flashNoticeVisibilityObserver: observer('flashNotice.visibility', function() {
    this.set('flashNoticeVisibility', this.get('flashNotice.visibility'));
    this.set('flashNoticeStatus', this.get('flashNotice.status'));
    this.set('flashNoticeContent', this.get('flashNotice.content'));
    this.set('flashNoticeIsPermanent', this.get('flashNotice.isPermanent'));
  }),
  actions: {
    dismissFlashNotice() {
      this.flashNotice.dismiss();
    }
  },
  init() {
    this._super();

    // Initialize observers
    this.get('flashNotice.visibility');
  }
});
