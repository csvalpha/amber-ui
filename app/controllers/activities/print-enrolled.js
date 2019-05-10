import Controller from '@ember/controller';

export default Controller.extend({
  showAllergyInfo: true,
  showCheckbox: true,
  currentTab: 'form', // Possible options: [ form, consumptionList ]
  options: ['Bier', 'Fris'],
  newOption: '',
  additionalEmptyRows: 5,
  showRobertHofstra: true,
  modelPath: 'model.form.responses',

  actions: {
    print() {
      const title = this.get('model.title');
      const popup = window.open('', 'PRINT', 'height=400,width=600');

      popup.document.write(`<html><head><title>Inschrijflijst ${title}</title>`);
      popup.document.write('<link rel="stylesheet" href="/assets/vendor.css">');
      popup.document.write('<link rel="stylesheet" href="/assets/alpha-amber.css">');
      popup.document.write('</head><body onload="window.print()" onfocus="setTimeout(window.close, 500)">');
      popup.document.write(document.getElementById('printarea').innerHTML);
      popup.document.write('</body></html>');
      popup.document.close(); // Necessary for IE >= 10
      popup.focus(); // Necessary for IE >= 10*/
    },
    selectForm() {
      this.set('currentTab', 'form');
    },
    selectConsumptionList() {
      this.set('currentTab', 'consumptionList');
    },
    removeOption(index) {
      this.get('options').removeAt(index, 1);
    },
    addOption() {
      const option = this.get('newOption');
      this.get('options').pushObject(option);
      this.set('newOption', '');
    },
    reorderItems(itemModels) {
      this.set('options', itemModels);
    }
  }
});
