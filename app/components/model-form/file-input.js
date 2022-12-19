import EmberArray from '@ember/array';
import ENV from '../../config/environment';
import ModelFormTextInput from './text-input';
import { action } from '@ember/object';

export default class FileInput extends ModelFormTextInput {
  fileTooBig = false;
  extensionNotPermitted = false;
  maxFilesize = ENV.maxFilesize;
  validMimetypes = 'image/jpeg,image/png';
  validExtensions = EmberArray.apply(['png', 'jpeg', 'jpg']);

  get validExtensionsString() {
    return this.validExtensions.join(', ');
  }

  extensionInvalid(context, file) {
    const fileExtension = file.name.split('.').slice(-1)[0].toLowerCase();
    return !context.get('validExtensions').includes(fileExtension);
  }

  @action
  fileLoaded(file) {
    this.fileTooBig = false;
    this.extensionNotPermitted = false;

    // File.size is in bytes
    if (file.size > ENV.maxFilesize * 1048576) {
      this.fileTooBig = true;
    } else if (this.extensionInvalid(this, file)) {
      this.extensionNotPermitted = true;
    } else {
      file.readAsDataURL().then((data) => {
        file.data = data;
        this.loadedCallback(file);
      });
    }
  }
}
