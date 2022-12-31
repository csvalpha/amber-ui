import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const tabs = ['form', 'consumptionList'];
const formTab = tabs[0];
const consumptionListTab = tabs[1];

export default class PrintEnrolledController extends Controller {
  @tracked showAllergyInfo = true;
  @tracked showCheckbox = true;
  @tracked currentTab = formTab;
  @tracked options = ['Bier', 'Fris'];
  @tracked newOption = '';
  @tracked showRobertHofstra = true;
  additionalEmptyRows = 5;

  get sortedResponses() {
    return this.model.form.get('responses').sortBy('userFullName');
  }

  @action
  print() {
    const { title } = this.model;
    const popup = window.open('', 'PRINT', 'height=400,width=600');

    popup.document.write(`<html><head><title>Inschrijflijst ${title}</title>`);
    popup.document.write('<link rel="stylesheet" href="/assets/vendor.css"/>');
    popup.document.write(
      '<link rel="stylesheet" href="/assets/amber-ui.css"/>'
    );
    popup.document.write(
      '</head><body onload="window.print()" onfocus="setTimeout(window.close, 500)">'
    );
    popup.document.write(document.getElementById('printarea').innerHTML);
    popup.document.write('</body></html>');
    popup.document.close(); // Necessary for IE >= 10
    popup.focus(); // Necessary for IE >= 10*/
  }

  @action
  selectForm() {
    this.currentTab = formTab;
  }

  @action
  selectConsumptionList() {
    this.currentTab = consumptionListTab;
  }

  @action
  removeOption(index) {
    this.options.removeAt(index, 1);
  }

  @action
  addOption() {
    this.options.pushObject(this.newOption);
    this.newOption = '';
  }

  @action
  reorderItems(itemModels) {
    this.options = itemModels;
  }
}
