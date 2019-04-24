import { computed } from '@ember/object';
import EmberArray from '@ember/array';
import ENV from '../../config/environment';
import ModelFormTextInputComponent from './text-input';

export default ModelFormTextInputComponent.extend({
  fileTooBig: false,
  extensionNotPermitted: false,
  maxFilesize: ENV.maxFilesize,
  validMimetypes: 'image/jpeg,image/png',
  validExtensions: EmberArray.apply(['png', 'jpeg', 'jpg']),
  validExtensionsString: computed('validExtensions', function() {
    return this.get('validExtensions').join(', ');
  }),

  extensionInvalid(context, file) {
    const fileExtension = file.filename.split('.').slice(-1)[0].toLowerCase();
    return !context.get('validExtensions').includes(fileExtension);
  },
  actions: {
    fileLoaded(file) {
      this.set('fileTooBig', false);
      this.set('extensionNotPermitted', false);

      // File.size is in bytes
      if (file.size > (ENV.maxFilesize * 1048576)) {
        this.set('fileTooBig', true);
      } else if (this.get('extensionInvalid')(this, file)) {
        this.set('extensionNotPermitted', true);
      } else {
        this.sendAction('fileLoaded', file);
      }
    }
  }
});
