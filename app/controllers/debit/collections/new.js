import EmberArray from '@ember/array';
import { action } from '@ember/object';
import EditController from 'amber-ui/controllers/application/edit';

export default class DebitCollectionNewController extends EditController {
  successMessage = 'Incasso aangemaakt!';
  cancelMessage = 'Incasso aanmaken geannuleerd.';
  successTransitionTarget = 'debit.collections.show';
  cancelTransitionTarget = 'debit.collections.index';
  cancelTransitionModel = null;

  validMimetypes = 'text/csv';
  validExtensions = EmberArray.apply(['csv']);
  @action
  fileLoaded(file) {
    const collection = this.model;
    collection.importFile = file.data;
  }
}
