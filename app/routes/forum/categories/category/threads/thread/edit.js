import EditRoute from 'alpha-amber/routes/application/edit';

export default EditRoute.extend({
  canAccess() {
    return this.can.can('edit forum/threads');
  },
  model() {
    const thread = this.modelFor('forum.categories.category.threads.thread');
    return { thread };
  },
  modelName: 'forum/thread',
  title: 'Topic aanpassen',
  deactivate() {
    const thread = this.get('controller.model.thread');
    if (thread) {
      thread.rollbackAttributes();
    }
  }
});
