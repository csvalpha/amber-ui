import EmberArray from '@ember/array';
import { action } from '@ember/object';
import EditController from 'amber-ui/controllers/application/edit';

export default class DebitCollectionNewController extends EditController {
  successMessage = 'Incasso opgeslagen!';
  successTransitionTarget = 'debit.collections.show';
  validMimetypes = 'text/csv';
  validExtensions = EmberArray.apply(['csv']);
  @action
  fileLoaded(file) {
    const collection = this.model;
    collection.importFile = file.data;
  }
}
