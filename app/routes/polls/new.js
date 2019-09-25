import NewRoute from 'alpha-amber/routes/application/new';

export default NewRoute.extend({
  canAccess() {
    return this.can('create polls');
  },
  modelName: 'poll',
  parents: ['polls.index'],
  title: 'Poll aanmaken',
  model() {
    const newPoll = this.store.createRecord(this.modelName);
    newPoll.set('author', this.get('session.currentUser'));
    const newForm = this.store.createRecord('form/form');
    const newQuestion = this.store.createRecord('form/closed-question');
    newQuestion.set('form', newForm);
    newQuestion.set('position', 0);
    newQuestion.set('required', true);
    newQuestion.set('fieldType', 'radio');
    newPoll.set('form', newForm);
    return newPoll;
  },
  deactivate() {
    const currentPoll = this.get('controller.model');
    currentPoll.rollbackAttributesAndForm();
  }
});
