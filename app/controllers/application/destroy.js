import { isNone } from '@ember/utils';
import EditController from 'alpha-amber/controllers/application/edit';

export default EditController.extend({
  successMessage: 'Verwijderen gelukt!',
  actions: {
    destroy() {
      this.set('errorMessage', null);
      const model = this.get('model');

      if (!isNone(model)) {
        model.destroyRecord().then(() => {
          this.send('onSuccess');
        }).catch(error => {
          this.send('onError', error);
        });
      }
    },
    saveModel: undefined,
    submit: undefined
  }
});
