import { isNone } from '@ember/utils';
export default class ModelSaveUtil {
  constructor(entity) {
    this.entity = entity;
  }

  sendSuccess() {
    if (!isNone(this.entity?.successMessage)) {
      this.entity?.flashNotice?.sendSuccess(this.entity.successMessage);
    }
  }

  transition(target, model) {
    const transition_args = model ? [target, model] : [target]
    if (this.entity.transition) {
      this.entity.transition(...transition_args);
    } else {
      this.entity.transitionToRoute(...transition_args);
    }
  }

  redirectSuccess(model) {
    const targetModel = this.entity?.successTransitionModel ?? model;
    if (!isNone(this.entity?.successTransitionTarget)) {
      this.transition(
        this.entity.successTransitionTarget,
        targetModel?.id,
      );
    }
  }

  redirectCancel() {
    const targetModel = this.entity?.cancelTransitionModel;
    if (!isNone(this.entity?.cancelTransitionTarget)) {
      this.transition(
        this.entity.cancelTransitionTarget,
        targetModel?.id,
      )
    }
  }

  onSuccess(model) {
    // Show notice
    this.sendSuccess();
    if (this.entity?.onSuccess) {
      this.entity.onSuccess(model);
    } else {
      // Redirect
      this.redirectSuccess(model)
    }
  }

  onError(error) {
    if (this.entity?.onError) {
      this.entity.onError(error);
    } else {
      this.entity.errorMessage = error.errors.map((err) => err.detail).join(', ');
    }
  }

  saveModel(model) {
    this.entity.errorMessage = null;
    if (!isNone(model)) {
      model
        .save()
        .then((savedModel) => {
          this.onSuccess(savedModel);
        })
        .catch((error) => {
          this.onError(error);
        });
    }
  }

  saveModelWithForm(model) {
    this.entity.errorMessage = null;
    if (!isNone(model)) {
      model.saveWithForm()
        .then((savedModel) => {
          this.onSuccess(savedModel);
        })
        .catch((error) => {
          this.onError(error);
        });
    }
  }

  destroyModel(model) {
    this.entity.errorMessage = null;
    if (!isNone(model)) {
      model.destroyRecord()
        .then(() => {
          this.onSuccess(null);
        })
        .catch((error) => {
          this.onError(error);
        });
    }
  }

  cancelEdit() {
    this.entity.errorMessage = null;
    this.redirectCancel();
  }
}
