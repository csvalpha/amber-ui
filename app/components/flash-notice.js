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
    this.set('flashNoticeVisibility', this.flashNotice.visibility);
    this.set('flashNoticeStatus', this.flashNotice.status);
    this.set('flashNoticeContent', this.flashNotice.content);
    this.set('flashNoticeIsPermanent', this.flashNotice.isPermanent);
  }),
  actions: {
    dismissFlashNotice() {
      this.flashNotice.dismiss();
    }
  },
  init() {
    this._super();

    // Initialize observers
    this.flashNotice.visibility;
  }
});
