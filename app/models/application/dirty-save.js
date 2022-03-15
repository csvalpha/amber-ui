import Model from '@ember-data/model';

export default class DirtySaveModel extends Model {
  saveIfDirty() {
    if (this.hasDirtyAttributes) {
      return this.save();
    }
  }
}
