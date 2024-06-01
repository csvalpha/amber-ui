import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { next } from '@ember/runloop';

export default class PhotoTags extends Component {
  @service store;
  @service flashNotice;
  @tracked newTagX;
  @tracked newTagY;
  @tracked selectApi;
  @tracked showTags = false;

  get users() {
    console.log(this.args.model.tags);
    return this.store.findAll('user');
  }

  @action
  toggleShowTags() {
    this.showTags = !this.showTags;
  }

  @action
  addTag(e) {
    if (e.target.tagName.toLowerCase() != 'img') return;
    let x = (e.layerX / e.target.width) * 100;
    let y = (e.layerY / e.target.height) * 100;
    this.newTagX = x;
    this.newTagY = y;
    next(this, () => {
      this.selectApi.actions.open();
    });
  }

  @action
  hideAddTag() {
    this.newTagX = null;
    this.newTagY = null;
  }

  @action
  async storeTag(taggedUser) {
    let photo = this.args.model;
    let photoTag = this.store.createRecord('photo-tag', {
      photo,
      taggedUser,
      x: this.newTagX,
      y: this.newTagY,
    });
    this.newTagX = null;
    this.newTagY = null;

    try {
      await photoTag.save();
      this.flashNotice.sendSuccess('Tag opgeslagen!');
      photo.reload();
      this.showTags = true;
    } catch (e) {
      this.flashNotice.sendError(
        'Tag opslaan mislukt. Is deze gebruiker al getagged?'
      );
      photoTag.deleteRecord();
    }
  }

  @action
  async deleteTag(tag) {
    try {
      tag.deleteRecord();
      await tag.save();
      this.flashNotice.sendSuccess('Tag verwijderd!');
      this.args.model.reload();
    } catch (e) {
      this.flashNotice.sendError('Tag verwijderen mislukt.');
      tag.rollbackAttributes();
    }
  }

  @action
  openUserSelect(userSelect) {
    if (this.selectApi == null) {
      this.selectApi = userSelect;
    }
  }

  get newTagStyle() {
    if (!this.newTagX || !this.newTagY) return null;
    return Ember.String.htmlSafe(`left: ${parseFloat(this.newTagX)}%; top: ${parseFloat(
      this.newTagY
    )}%;`);
  }
}
