import { alias } from '@ember/object/computed';
import EmberArray from '@ember/array';
import NewController from 'amber-ui/controllers/application/new';

export default NewController.extend({
  successMessage: 'Incasso opgeslagen!',
  successTransitionTarget: 'debit.collections.show',
  successTransitionModel: alias('model.id'),

  validMimetypes: EmberArray.apply([
    'text/csv',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel.sheet.macroenabled.12',
  ]),
  validExtensions: EmberArray.apply(['csv', 'ods', 'xlsx', 'xlsm']),

  actions: {
    fileLoaded(file) {
      const collection = this.model;
      collection.set('importFile', file.data);
    },
  },
});
