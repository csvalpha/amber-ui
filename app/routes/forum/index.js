import IndexRoute from 'alpha-amber/routes/application/index';

export default IndexRoute.extend({
  canAccess() {
    return this.can('show forum/categories');
  },
  modelName: 'forum/category',
  title: 'Forum',
  beforeModel() {
    this.transitionTo('forum.categories');
  }
});
