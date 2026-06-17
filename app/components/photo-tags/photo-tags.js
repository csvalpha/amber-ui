import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { next } from '@ember/runloop';
import { htmlSafe } from '@ember/template';

export default class PhotoTags extends Component {
  @service store;
  @service flashNotice;
  @service router;
  @tracked newTagX;
  @tracked newTagY;
  @tracked selectApi;
  @tracked showTags = false;
  @tracked users = [];

  get includeOldMembers() {
    return this.router.currentRoute.queryParams.includeOldMembers === 'true';
  }

  async fetchUsers() {
    if (this.includeOldMembers) {
      this.users = await this.store.findAll('user');
    } else {
      const params = { filter: { group: 'Leden' } };
      this.users = await this.store.query('user', params);
    }
  }

  @action
  toggleShowTags() {
    this.showTags = !this.showTags;
  }

  @action
  toggleIncludeOldMembers() {
    const newValue = !this.includeOldMembers;
    this.router.transitionTo({ queryParams: { includeOldMembers: newValue ? 'true' : 'false' } });
    this.fetchUsers();
  }

  @action
  onSearchChange(searchResults) {
    // Auto-select the user if there's only one search result
    if (searchResults && searchResults.length === 1 && this.selectApi) {
      next(this, () => {
        this.selectApi.actions.choose(searchResults[0]);
      });
    }
  }

  @action
  addTag(e) {
    if (e.target.tagName.toLowerCase() != 'img' || this.newTagX || this.newTagY)
      return;
    e.stopPropagation();
    this.fetchUsers();
    let x = (e.offsetX / e.target.width) * 100;
    let y = (e.offsetY / e.target.height) * 100;
    this.newTagX = x;
    this.newTagY = y;
    next(this, () => {
      this.selectApi.actions.open();
    });
  }

  @action
  addCloseAddTagListener() {
    this.closeAddTagListener = (e) => {
      let element = e.target;
      if (
        element.closest('.ember-power-select-dropdown') !== null ||
        element.closest('.photo-tag--new') !== null
      )
        return;
      e.stopPropagation();
      this.newTagX = null;
      this.newTagY = null;
    };

    document.addEventListener('click', this.closeAddTagListener);
  }

  @action
  removeCloseAddTagListener() {
    document.removeEventListener('click', this.closeAddTagListener);
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
    this.selectApi = userSelect;
  }

  get newTagStyle() {
    if (!this.newTagX || !this.newTagY) return null;
    return htmlSafe(
      `left: ${parseFloat(this.newTagX)}%; top: ${parseFloat(this.newTagY)}%;`
    );
  }
}
