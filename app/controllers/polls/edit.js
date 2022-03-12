import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { union } from '@ember/object/computed';

export default class EditPollController extends Controller {
  @service('flash-notice') flashNotice;
  @service session;
  @service store;

  @union('model.errors', 'model.form.errors')
  combinedErrors;

  @action
  submit() {
    const poll = this.model;
    poll
      .saveWithForm()
      .then((savedPoll) => {
        this.transitionToRoute('polls.show', savedPoll.get('id'));
        this.flashNotice.sendSuccess('Poll opgeslagen!');
      })
      .catch((error) => {
        this.set('errorMessage', error.message);
      });
  }
}
