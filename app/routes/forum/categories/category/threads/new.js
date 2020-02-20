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
    const thread = this.get('controller.model.thread');
    const post = this.get('controller.model.post');
    if (thread) {
      thread.rollbackAttributes();
    }

    if (post) {
      post.rollbackAttributes();
    }
  }
});
