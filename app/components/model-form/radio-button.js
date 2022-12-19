import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class RadioButton extends Component {
  get checked() {
    return this.args.groupValue === this.args.value;
  }

  @action
  change() {
    if (this.groupValue !== this.value) {
      this.groupValue = this.value;
    }
  }
}
