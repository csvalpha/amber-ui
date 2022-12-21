import EmberArray from '@ember/array';
import { action } from '@ember/object';
import EditController from 'amber-ui/controllers/application/edit';

export default class DebitCollectionNewController extends EditController {
  successMessage = 'Incasso aangemaakt!';
  cancelMessage = 'Incasso aanmaken geannuleerd.';
  successTransitionTarget = 'debit.collections.show';
  cancelTransitionTarget = 'debit.collections.index';
  get cancelTransitionModel() {
    return null;
  }

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
