import EditController from 'alpha-amber/controllers/application/edit';

export default EditController.extend({
  successMessage: 'Topic aangepast!',
  successTransitionTarget: 'forum.categories.category.threads.thread',
  actions: {
    submit() {
      this.send('saveModel', this.model.thread);
    }
  }
});
