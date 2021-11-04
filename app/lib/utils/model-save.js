import { isNone } from '@ember/utils';

export default class ModelSaveUtil {
  constructor(entity) {
    this.entity = entity;
  }

  onSuccess(model) {
    // Show notice
    if (!isNone(this.entity.successMessage)) {
      this.entity.flashNotice.sendSuccess(this.entity.successMessage);
    }

    // Redirect
    if (!isNone(this.entity.successTransitionTarget)) {
      if (isNone(model)) {
        // In destroy routes, model is undefined
        this.entity.transitionToRoute(this.entity.successTransitionTarget);
      } else {
        const targetModel = this.entity.successTransitionModel || model;
        this.entity.transitionToRoute(this.entity.successTransitionTarget, targetModel);
      }
    }
  }

  onError(error) {
    this.entity.errorMessage = error.errors.map((e) => e.detail).join(', ');
  }

  saveModel(model) {
    this.entity.errorMessage = null;
    if (!isNone(model)) {
      model.save()
        .then(savedModel => {
          this.onSuccess(savedModel);
        }).catch(error => {
          this.onError(error);
        });
    }
  }
}
