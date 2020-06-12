import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { isNone } from '@ember/utils';

export default Mixin.create({
  flashNotice: service('flash-notice'),
  intl: service(),
  successMessage: 'Wijzigen gelukt!',
  successTransitionTarget: null,
  successTransitionModel: null,
  @tracked errorMessage: null,
  actions: {
    onSuccess(model) {
      // Show notice
      if (!isNone(this.successMessage)) {
        this.flashNotice.sendSuccess(this.successMessage);
      }

      // Redirect
      if (!isNone(this.successTransitionTarget)) {
        if (isNone(model)) {
          // In destroy routes, model is undefined
          this.transitionToRoute(this.successTransitionTarget);
        } else {
          const targetModel = this.successTransitionModel || model;
          this.transitionToRoute(this.successTransitionTarget, targetModel);
        }
      }
    },
    onError(error) {
      this.set('errorMessage', error.errors.map((e) => {
        return e.detail;
      }).join(', '));
    },
    submit() {
      this.send('saveModel', this.model);
    },
    saveModel(model) {
      this.set('errorMessage', null);
      if (!isNone(model)) {
        model.save().then(savedModel => {
          this.send('onSuccess', savedModel);
        }).catch(error => {
          this.send('onError', error);
        });
      }
    }
  }
});
