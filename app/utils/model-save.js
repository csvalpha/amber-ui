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

  redirect(model) {
    const targetModel = this.entity?.successTransitionModel ?? model;
    if (!isNone(this.entity?.successTransitionTarget)) {
      this.transition(
        this.entity.successTransitionTarget,
        targetModel,
      );
    }
  }

  onSuccess(model) {
    // Show notice
    this.sendSuccess();
    // todo: make sure that all subclasses of the edit controller correctly implement onsuccess, and don't call sendsuccess unnecessarily
    if (this.entity?.onSuccess) {
      this.entity.onSuccess(model);
    } else {
      // Redirect
      this.redirect(model)
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
}
