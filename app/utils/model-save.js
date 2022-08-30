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

  onSuccess(model) {
    // Show notice
    this.sendSuccess();
    // todo: make sure that all subclasses of the edit controller correctly implement onsuccess, and don't call sendsuccess unnecessarily
    if (this.entity?.onSuccess) {
      this.entity.onSuccess();
    } else {
      // Redirect
      const targetModel = this.entity?.successTransitionModel ?? model;
      if (!isNone(this.entity?.successTransitionTarget)) {
        if (isNone(targetModel)) {
          // In destroy routes, targetModel is undefined
          this.entity.transitionToRoute(this.entity.successTransitionTarget);
        } else {
          this.entity.transitionToRoute(
            this.entity.successTransitionTarget,
            targetModel,
          );
        }
      }
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
