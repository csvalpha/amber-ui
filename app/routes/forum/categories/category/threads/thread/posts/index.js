import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { assign } from '@ember/polyfills';
import IndexRoute from 'alpha-amber/routes/application/index';
import PagedModelRouteMixin from 'alpha-amber/mixins/paged-model-route-mixin';

export default IndexRoute.extend(PagedModelRouteMixin, {
  canAccess() {
    return this.can.can('show forum/posts');
  },
  storage: service('local-storage'),
  router: service(),
  fetch: service(),
  modelName: 'forum/post',

  model(params) {
    const category = this.modelFor('forum.categories.category');
    const thread = this.modelFor('forum.categories.category.threads.thread');
    assign(params, {
      paramMapping: this.paramMapping,
      filter: { thread: thread.id },
      sort: 'created_at'
    });
    const postsPromise = this.findPaged('forum/post', params);

    return {
      category,
      thread,
      posts: postsPromise
    };
  },

  title: computed.reads('controller.model.thread.title'),

  pageActions: computed('can', 'controller.model.thread', function() {
    return [
      {
        link: 'forum.categories.category.threads.thread.edit',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: this.controller.model.thread,
        canAccess: this.can.can('edit forum/threads')
      },
      {
        link: 'forum.categories.category.threads.thread.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: this.controller.model.thread,
        canAccess: this.can.can('destroy forum/threads')
      }
    ];
  }),

  init() {
    this._super(...arguments);

    this.router.on('routeDidChange', () => {
      const thread = this.modelFor('forum.categories.category.threads.thread');
      this.fetch.fetch(`/forum/threads/${thread.id}/mark_read`, { method: 'POST' });
    });
  }
});
