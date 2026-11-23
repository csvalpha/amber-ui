import Component from '@glimmer/component';
import EmberArray from '@ember/array';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DeclarationFormComponent extends Component {
  @tracked receiptMissing;
  @tracked receiptFileName = null;

  validMimetypes = 'image/jpeg,image/png,application/pdf';
  validExtensions = EmberArray.apply(['jpg', 'jpeg', 'png', 'pdf']);

  constructor() {
    super(...arguments);
    const { model } = this.args;
    this.receiptMissing =
      Boolean(model.missingReceiptReason) && !model.hasReceipt;
  }

  @action
  receiptLoaded(file) {
    // A file can finish loading after the user switched to "Ik heb geen bon"
    if (this.receiptMissing) {
      return;
    }
    this.args.model.receipt = file.data;
    this.args.model.missingReceiptReason = null;
    this.receiptFileName = file.name;
  }

  @action
  toggleReceiptMissing(event) {
    this.receiptMissing = event.target.checked;
    if (this.receiptMissing) {
      this.args.model.receipt = null;
      this.receiptFileName = null;
    } else {
      this.args.model.missingReceiptReason = null;
    }
  }
}
