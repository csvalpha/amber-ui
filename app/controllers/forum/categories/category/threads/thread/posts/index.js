import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { next } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

export default class PostsIndexController extends Controller {
  @service session;
  @service store;
  @tracked newContent = '';

  queryParams = ['page'];

  get count() {
    return this.model.postsPaged.length;
  }

  get currentPageIsLastPage() {
    const page = parseInt(this.model.postsPaged.meta.page, 10);
    const totalPages = parseInt(this.model.postsPaged.meta.totalPages, 10);

    return totalPages === 0 || page === totalPages;
  }

  advanceToPage(delta) {
    const page = this.model.postsPaged.meta.page;
    const pages = this.model.postsPaged.meta.totalPages;
    this.replaceRoute({
      queryParams: { page: ((page - 1 + delta + pages) % pages) + 1 },
    });
  }

  scrollToNewForumPost() {
    document
      .getElementById('newForumPostCard')
      .scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  @action
  async newPostCreated() {
    // we don't need to await the posts reload. A thread can have a LOT of posts, so this is worth not awaiting.
    // Not sure if we need the posts to be reloaded at all, but I suspect that if we don't reload them,
    // then we will get bugs when performing any subsequent model.rollbackAttributesAndPosts()
    // Minor concern, but better safe than sorry.
    this.model.posts.reload();
    await this.model.queryPostsPaged();
    // navigate to the next page if we notice that we created a post that doesn't fit on the current page
    if (!this.currentPageIsLastPage) {
      await this.transitionToRoute({
        queryParams: { page: this.model.postsPaged.meta.totalPages },
      });
    }
  }

  @action
  async addQuote(q) {
    if (!this.newContent?.endsWith('\n')) {
      // insert a newline in between if necessary
      this.newContent = `${this.newContent}\n${q} \n\n`;
    } else {
      this.newContent = `${this.newContent}${q} \n\n`;
    }
    if (!this.currentPageIsLastPage) {
      await this.transitionToRoute({
        queryParams: { page: this.model.postsPaged.meta.totalPages },
      });
      next(() => {
        this.scrollToNewForumPost();
      });
    } else {
      this.scrollToNewForumPost();
    }
  }

  @action
  setNewContent(content) {
    this.newContent = content;
  }

  @action
  goToPreviousPage() {
    return this.advanceToPage(-1);
  }

  @action
  goToNextPage() {
    return this.advanceToPage(1);
  }

  @action
  onSwipe(direction) {
    return this.advanceToPage(-direction);
  }
}
