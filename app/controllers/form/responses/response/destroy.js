import DestroyController from 'amber-ui/controllers/application/destroy';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ResponseDestroyController extends DestroyController {
  @service store;

  successMessage = 'Je inschrijving is verwijderd.';
  successTransitionTarget = 'activities';
  cancelTransitionTarget = 'activities';
  // FIXME: there is no way (currently) to redirect from a form response to the
  //  activity, since the models are not designed with this in mind.
  //  I would not mind this being enabled by a slight redesign in the future,
  //  though.
  cancelTransitionModel = null;

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
