import NewRoute from 'alpha-amber/routes/application/new';

export default NewRoute.extend({
  canAccess() {
    return this.can.can('create forum/threads');
  },
  modelName: 'forum/thread',
  title: 'Topic aanmaken',
  model() {
    const category = this.modelFor('forum.categories.category');
    const thread = this.store.createRecord('forum/thread', { category });
    const post = this.store.createRecord('forum/post', { thread });

    return { category, thread, post };
  },
  deactivate() {
    this.controller.model.thread?.rollbackAttributes();
    this.controller.model.post?.rollbackAttributes();
  }
});
