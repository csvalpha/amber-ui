import { alias } from '@ember/object/computed';
import EmberArray from '@ember/array';
import NewController from 'amber-ui/controllers/application/new';

export default NewController.extend({
  successMessage: 'Incasso opgeslagen!',
  successTransitionTarget: 'debit.collections.show',
  successTransitionModel: alias('model.id'),

  validMimetypes: 'text/csv',
  validExtensions: EmberArray.apply(['csv']),

  actions: {
    fileLoaded(file) {
      const collection = this.model;
      collection.set('importFile', file.data);
    },
  },
});
