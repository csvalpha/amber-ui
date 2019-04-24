import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';

export default Mixin.create({
  flashNotice: service('flash-notice'),
  i18n: service(),
  successMessage: 'Wijzigen gelukt!',
  successTransitionTarget: null,
  successTransitionModel: null,
  errorMessage: null,
  actions: {
    onSuccess(model) {
      const flashNotice = this.get('flashNotice');
      const successMessage = this.get('successMessage');
      const successTransitionTarget = this.get('successTransitionTarget');

      // Show notice
      if (!isNone(successMessage)) {
        flashNotice.sendSuccess(this.get('i18n').t(successMessage));
      }

      // Redirect
      if (!isNone(successTransitionTarget)) {
        if (isNone(model)) {
          // In destroy routes, model is undefined
          this.transitionToRoute(successTransitionTarget);
        } else {
          const targetModel = this.get('successTransitionModel') || model;
          this.transitionToRoute(successTransitionTarget, targetModel);
        }
      }
    },
    onError(error) {
      this.set('errorMessage', error.errors.map((e) => {
        return this.get('i18n').t(e.detail);
      }).join(', '));
    },
    submit() {
      const model = this.get('model');
      this.send('saveModel', model);
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
