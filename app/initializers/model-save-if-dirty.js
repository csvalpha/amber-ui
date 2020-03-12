import Model from '@ember-data/model';
import { resolve } from 'rsvp';

export function initialize(/* application */) {
  Model.reopen({
    saveIfDirty() {
      if (this.hasDirtyAttributes) {
        return this.save();
      }

      return resolve(this);
    }
  });
}

export default {
  name: 'model-save-if-dirty',
  initialize
};
