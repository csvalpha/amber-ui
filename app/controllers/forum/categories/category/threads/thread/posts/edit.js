import EditController from 'alpha-amber/controllers/application/edit';
import { action } from '@ember/object';

export default class EditPostController extends EditController {
  successMessage = 'Forumbericht aangepast!';
  successTransitionTarget = null; // Custom transition is used in onSuccess.

  @action
  onSuccess(model) {
    this.transitionToRoute('forum.categories.category.threads.thread', model.get('thread'));
  }
}
