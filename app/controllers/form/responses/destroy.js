import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import DestroyController from 'amber-ui/controllers/application/destroy';

export default class FormResponseDestroyController extends DestroyController {
  @service store;
  successMessage = 'Je inschrijving is verwijderd.';
  successTransitionTarget = 'activities.index';

  @action
  async destroyModel() {
    this.form = await this.model.form;
    super.destroyModel();
  }
  onSuccess(model) {
    this.form.reload();
    this.modelSaveUtil.redirectSuccess(model);
  }
}
