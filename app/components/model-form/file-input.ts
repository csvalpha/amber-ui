import TextInput, { type TextInputSignature } from './text-input';
import ENV from 'amber-ui/config/environment';
import type { UploadFile } from 'ember-file-upload';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export interface FileInputSignature extends TextInputSignature {
  Args: TextInputSignature['Args'] & {
    validMimeTypes?: string[];
    validExtensions?: string[];
    loadedCallback: (
      file: UploadFile,
      data: Awaited<ReturnType<UploadFile['readAsDataURL']>>
    ) => void;
  };
}

export default class FileInput extends TextInput<FileInputSignature> {
  @tracked fileTooBig = false;
  @tracked extensionNotPermitted = false;

  maxFilesize = `${ENV.maxFilesize}MB`;

  get validMimeTypes() {
    return this.args.validMimeTypes ?? ['image/jpeg', 'image/png'];
  }

  get validExtensions() {
    return this.args.validExtensions ?? ['jpeg', 'jpg', 'png'];
  }

  extensionInvalid(file: UploadFile): boolean {
    const fileExtension = file.name.split('.').slice(-1)[0]?.toLowerCase();
    if (typeof fileExtension === 'undefined') {
      throw new Error('Could not parse file extension');
    }
    return !this.validExtensions.includes(fileExtension);
  }

  @action async fileLoaded(file: UploadFile): Promise<void> {
    this.fileTooBig = false;
    this.extensionNotPermitted = false;

    // File.size is in bytes
    if (file.size > ENV.maxFilesize * 1048576) {
      this.fileTooBig = true;
    } else if (this.extensionInvalid(file)) {
      this.extensionNotPermitted = true;
    } else {
      this.args.loadedCallback(file, await file.readAsDataURL());
    }
  }
}
