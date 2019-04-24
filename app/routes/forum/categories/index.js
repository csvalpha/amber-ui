import { computed } from '@ember/object';
import IndexRoute from 'alpha-amber/routes/application/index';

export default IndexRoute.extend({
  canAccess() {
    return this.can('show forum/categories');
  },
  model() {
    return {
      categories: this.store.query('forum/category', { sort: '-updated_at' }),
      recentThreads: this.store.query('forum/thread', { sort: '-updated_at', page: { number: '1', size: 7 } })
    };
  },
  modelName: 'forum/category',
  title: 'Forum',
  pageActions: computed(function() {
    return [
      {
        link: 'forum.categories.new',
        title: 'Nieuwe categorie',
        icon: 'plus',
        canAccess: this.can('create forum/categories')
      }
    ];
  })
});
