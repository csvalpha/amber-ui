import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import DestroyController from 'amber-ui/controllers/application/destroy';

export default class FormResponseDestroyController extends DestroyController {
  @service store;
  successMessage = 'Je inschrijving is verwijderd.';
  successTransitionTarget = 'activities.index';
  cancelTransitionTarget = 'activities.index';
  // important note: there is no way (currently) to redirect from a form response to the activity, since the models
  // are not designed with this in mind.
  // I would not mind this being enabled by a slight redesign in the future, though.
  get cancelTransitionModel() {
    return null;
  }

  @action
  async destroyModel() {
    this.form = await this.model.form;
    super.destroyModel();
  }

  onSuccess() {
    this.form.reload();
    this.modelSaveUtil.redirectSuccess();
  }
}
