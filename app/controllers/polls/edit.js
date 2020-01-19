import { inject as service } from '@ember/service';
import { union } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  session: service(),
  store: service(),
  flashNotice: service('flash-notice'),
  combinedErrors: union('model.errors', 'model.form.errors'),
  actions: {
    submit() {
      const poll = this.model;
      poll.saveWithForm().then(savedPoll => {
        this.transitionToRoute('polls.show', savedPoll.get('id'));
        this.flashNotice.sendSuccess('Poll opgeslagen!');
      }).catch(error => {
        this.set('errorMessage', error.message);
      });
    }
  }
});
