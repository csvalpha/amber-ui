import { isNone } from '@ember/utils';
import EditController from 'alpha-amber/controllers/application/edit';
import ModelSaveUtil from 'alpha-amber/utils/model-save';

export default EditController.extend({
  successMessage: 'Verwijderen gelukt!',
  actions: {
    destroy() {
      const modelSaveUtil = new ModelSaveUtil(this);
      this.set('errorMessage', null);

      if (!isNone(this.model)) {
        this.model
          .destroyRecord()
          .then(modelSaveUtil.onSuccess.bind(modelSaveUtil))
          .catch(modelSaveUtil.onError.bind(modelSaveUtil));
      }
    },
    saveModel: undefined,
    submit: undefined,
  },
});
