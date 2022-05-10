import TextInputComponent from './text-input';
import { tracked } from '@glimmer/tracking';

export default class CheckboxGroupComponent extends TextInputComponent {
  @tracked _requiredAndNothingSelected;

  constructor(owner, args) {
    super(owner, args);
    console.log(this.args.required, 'constructor');
    this._requiredAndNothingSelected = this.args.required;
  }

  get requiredAndNothingSelected() {
    console.log('get');
    return this._requiredAndNothingSelected;
  }

  set requiredAndNothingSelected(value) {
    console.log('set');
    this._requiredAndNothingSelected = value;
  }
}
