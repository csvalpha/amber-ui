import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { next } from '@ember/runloop';

export default Controller.extend({
  session: service(),
  newContent: '',
  queryParams: ['page'],

  count: computed.reads('model.posts.length'),

  currentPageIsLastPage: computed(
    'model.posts.meta.{page,totalPages}',
    function () {
      const page = parseInt(this.model.posts.meta.page, 10);
      const totalPages = parseInt(this.model.posts.meta.totalPages, 10);

      return totalPages === 0 || page === totalPages;
    }
  ),

  advanceToPage(delta) {
    const page = this.model.posts.meta.page;
    const pages = this.model.posts.meta.totalPages;
    this.replaceRoute({
      queryParams: { page: ((page - 1 + delta + pages) % pages) + 1 },
    });
  },
  actions: {
    async newPostCreated() {
      await this.model.posts.reload();
    },
    addquote(q) {
      this.set('newContent', `${this.newContent}${q} \n\n`);
      if (!this.currentPageIsLastPage) {
        this.transitionToRoute({
          queryParams: { page: this.model.posts.meta.totalPages },
        }).then(() => {
          next(() => {
            document
              .getElementById('newForumPostCard')
              .scrollIntoView({ behavior: 'smooth', block: 'center' });
          });
        });
      } else {
        document
          .getElementById('newForumPostCard')
          .scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    goToPreviousPage() {
      return this.advanceToPage(-1);
    },
    goToNextPage() {
      return this.advanceToPage(1);
    },
    onSwipe(direction) {
      return this.advanceToPage(-direction);
    },
  },
});
