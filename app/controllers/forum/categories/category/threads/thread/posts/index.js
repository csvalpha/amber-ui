import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';

export default Controller.extend({
  session: service(),
  newContent: '',
  queryParams: ['page', 'perPage'],

  count: computed('model.posts', function() {
    return this.get('model.posts').length;
  }),

  page: computed('model.posts.page', {
    get() {
      return this.get('model.posts.page');
    },
    set(key, value) {
      // The first time this is called, content is null resulting in an error
      if (!isNone(this.model)) {
        this.set('model.posts.page', value);
      }

      return value;
    }
  }),

  totalPages: alias('model.posts.totalPages'),

  currentPageIsLastPage: computed('page', 'totalPages', function() {
    const totalPages = parseInt(this.totalPages, 10);
    return totalPages === 0 || parseInt(this.page, 10) === totalPages;
  }),

  actions: {
    async newPostCreated() {
      await this.model.posts.reload();
      this.send('goToLastPageAndScrollDown');
    },
    goToLastPageAndScrollDown() {
      this.set('page', this.totalPages);
    }
  }
});
