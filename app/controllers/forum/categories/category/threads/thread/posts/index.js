import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  session: service(),
  newContent: '',
  queryParams: ['page'],

  count: computed.reads('model.posts.length'),

  currentPageIsLastPage: computed('model.posts.meta.{page,totalPages}', function() {
    const page = parseInt(this.model.posts.meta.page, 10);
    const totalPages = parseInt(this.model.posts.meta.totalPages, 10);

    return totalPages === 0 || page === totalPages;
  }),

  actions: {
    async newPostCreated() {
      await this.model.posts.reload();
    }
  }
});
