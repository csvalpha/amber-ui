import EditController from 'alpha-amber/controllers/application/edit';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class BookEditController extends EditController {
  @service fetch

  successTransitionTarget = 'books.show'
  @tracked showScanner = false;
  @tracked devices = [];
  @tracked device = null;
  @tracked lookingUpIsbn = false;
  @tracked lookupIsbnError = false;

  @action
  coverPhotoLoaded(file) {
    const book = this.model;
    book.set('coverPhoto', file.data);
  }

  @action
  submit() {
    if (!this.model.isbn) {
      this.model.isbn = null;
    }

    super.submit();
  }

  @action
  toggleScanner() {
    this.showScanner = !this.showScanner;
  }

  @action
  onScanSuccess(result) {
    this.model.isbn = result.text;
    this.showScanner = false;
  }

  @action
  onDevicesFound(result) {
    this.devices = result;
    if (result.length > 0) {
      this.device = result[0];
    }
  }

  @action
  lookupIsbn() {
    this.lookingUpIsbn = true;
    this.lookupIsbnError = false;
    this.fetch.fetch(`/books/isbn_lookup?isbn=${this.model.isbn}`).then(response => {
      this.lookingUpIsbn = false;
      if (response.ok) {
        response.json().then(data => {
          this.model.title = data.title;
          this.model.author = data.author;
          this.model.description = data.description;
          this.model.coverPhoto = data.cover_photo;
        });
      } else {
        this.lookupIsbnError = true;
      }
    });
  }
}
