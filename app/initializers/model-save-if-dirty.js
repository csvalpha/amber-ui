import { resolve } from 'rsvp';
import DS from 'ember-data';

const { Model } = DS;

export function initialize(/* application */) {
  Model.reopen({
    saveIfDirty() {
      if (this.get('hasDirtyAttributes')) {
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
