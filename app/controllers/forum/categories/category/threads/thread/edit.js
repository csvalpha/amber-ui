import EditController from 'amber-ui/controllers/application/edit';
import { action } from '@ember/object';

export default class EditThreadController extends EditController {
  successMessage = 'Topic aangepast!';
  successTransitionTarget = 'forum.categories.category.threads.thread';

  @action
  submit() {
    this.modelSaveUtil.saveModel(this.model.thread);
  }
}
