import EditController from 'alpha-amber/controllers/application/edit';
import { action } from '@ember/object';

export default class BookEditController extends EditController {
  successTransitionTarget = 'books.show'

  @action
  coverPhotoLoaded(file) {
    const book = this.model;
    book.set('coverPhoto', file.data);
  }

  @action
  submit() {
    this.model.save().then(() => {
      this.transitionToRoute('books.show', this.model);
    }).catch(error => {
      this.errorMessage = error.message;
    });
  }
}
