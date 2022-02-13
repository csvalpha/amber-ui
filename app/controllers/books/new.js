import EditController from './edit';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class BookEditController extends EditController {
  @tracked showScanner = false;
  @tracked devices = [];
  @tracked device = null;

  @action
  toggleScanner() {
    this.showScanner = !this.showScanner;
  }

  @action
  onScanSuccess(result) {
    console.log('Scan result');
    console.log(result);
    this.model.isbn = result.text;
    this.showScanner = false;
  }

  @action
  onDevicesFound(result) {
    console.log(result);
    this.devices = result;
    if (result.length > 0) {
      this.device = result[0];
    }
  }
}
