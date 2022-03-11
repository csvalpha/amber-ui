import EditController from 'alpha-amber/controllers/application/edit';

export default EditController.extend({
  successMessage: 'Forumbericht aangepast!',
  successTransitionTarget: null, // Custom transition is used in onSuccess
  actions: {
    onSuccess(model) {
      this._super(...arguments);
      this.transitionToRoute(
        'forum.categories.category.threads.thread',
        model.get('thread')
      );
    },
  },
});
