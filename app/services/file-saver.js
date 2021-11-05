import FileSaver from 'file-saver';
import Service from '@ember/service';

export default class FileSaverService extends Service {
  saveFileAs(filename, content, contentType) {
    this.saveAs(new Blob([content], { type: contentType }), filename);
  }

  saveAs() {
    FileSaver.saveAs(...arguments);
  }
}
