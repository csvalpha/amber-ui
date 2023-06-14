import EditController from 'amber-ui/controllers/application/edit';
import EmberArray from '@ember/array';
import { action } from '@ember/object';

export default class CollectionsNewController extends EditController {
  successMessage = 'Incasso aangemaakt!';
  cancelMessage = 'Incasso aanmaken geannuleerd.';
  successTransitionTarget = 'debit.collections.collection';
  cancelTransitionTarget = 'debit.collections';
  cancelTransitionModel = null;

  validMimetypes = EmberArray.apply([
    'text/csv',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel.sheet.macroenabled.12',
  ]);

  validExtensions = EmberArray.apply(['csv', 'ods', 'xlsx', 'xlsm']);

  @action
  fileLoaded(file) {
    const collection = this.model;
    collection.importFile = file.data;
  }
}
