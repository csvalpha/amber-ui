import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';
import { inject as service } from '@ember/service';
import { assign } from '@ember/polyfills';

export default class PostIndexRoute extends AuthenticatedRoute {
  @service router;
  @service fetch;

  get breadCrumb() {
    return { title: this.controller.model.thread.title };
  }

  get pageActions() {
    return [
      {
        link: 'forum.categories.category.threads.thread.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: this.controller.model.thread,
        canAccess: this.abilities.can('edit forum/threads'),
      },
      {
        link: 'forum.categories.category.threads.thread.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: this.controller.model.thread,
        canAccess: this.abilities.can('destroy forum/threads'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show forum/posts');
  }

  async model(params) {
    const category = this.modelFor('forum.categories.category');
    const thread = this.modelFor('forum.categories.category.threads.thread');
    assign(params, {
      filter: { thread: thread.id },
      sort: 'created_at',
    });
    const postsPromise = await this.store.queryPaged('forum/post', params);

    return {
      category,
      thread,
      posts: postsPromise,
    };
  }

  constructor() {
    super(...arguments);

    this.router.on('routeDidChange', () => {
      const thread = this.modelFor('forum.categories.category.threads.thread');
      if (thread) {
        // only mark as read if we are in a thread
        this.fetch.fetch(`/forum/threads/${thread.id}/mark_read`, {
          method: 'POST',
        });
      }
    });
  }
}
