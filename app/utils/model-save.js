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

  sendCancel() {
    if (!isNone(this.entity?.cancelMessage)) {
      this.entity?.flashNotice?.sendInfo(this.entity.cancelMessage);
    }
  }

  transition(target, model) {
    target = target ?? 'index';
    const transitionArgs = model ? [target, model] : [target];
    if (this.entity.transition) {
      this.entity.transition(...transitionArgs);
    } else {
      this.entity.transitionToRoute(...transitionArgs);
    }
  }

  redirectSuccess(model) {
    const targetModel = this.entity?.successTransitionModel ?? model;
    if (!isNone(this.entity?.successTransitionTarget)) {
      this.transition(this.entity.successTransitionTarget, targetModel?.id);
    }
  }

  redirectCancel() {
    const targetModel = this.entity?.cancelTransitionModel;
    if (!isNone(this.entity?.cancelTransitionTarget)) {
      this.transition(this.entity.cancelTransitionTarget, targetModel?.id);
    }
  }

  onSuccess(model) {
    // Show notice
    this.sendSuccess();
    if (this.entity?.onSuccess) {
      this.entity.onSuccess(model);
    } else {
      // Redirect
      this.redirectSuccess(model);
    }
  }

  onCancel() {
    this.sendCancel();
    if (this.entity?.onCancel) {
      this.entity.onCancel();
    } else {
      this.redirectCancel();
    }
  }

  onError(error) {
    if (this.entity?.onError) {
      this.entity.onError(error);
    } else {
      this.entity.errorMessage = error.errors
        .map((err) => err.detail)
        .join(', ');
    }
  }

  async saveModel(model) {
    this.entity.errorMessage = null;
    if (!isNone(model)) {
      try {
        const savedModel = await model.save();
        this.onSuccess(savedModel);
      } catch (error) {
        this.onError(error);
      }
    }
  }

  async saveModelWithForm(model) {
    this.entity.errorMessage = null;
    if (!isNone(model)) {
      try {
        const savedModel = await model.saveWithForm();
        this.onSuccess(savedModel);
      } catch (error) {
        this.onError(error);
      }
    }
  }

  destroyModel(model) {
    this.entity.errorMessage = null;
    if (!isNone(model)) {
      model
        .destroyRecord()
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
    this.onCancel();
  }
}
