import EditRoute from 'alpha-amber/routes/application/edit';

export default EditRoute.extend({
  skipBeforeModelAccessCheck: true,
  afterModel(poll, transition) {
    return this.checkAccessWithPromise(this.can('edit poll', poll), transition);
  },
  modelName: 'poll',
  title: 'Poll aanpassen',
  parents: ['polls.index'],
  actions: {
    submit(poll) {
      poll.save().then(() => {
        this.transitionTo('poll.show', poll);
      }).catch(error => {
        this.set('errorMessage', error.message);
      });
    }
  }
});
