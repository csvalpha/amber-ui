import { assert } from '@ember/debug';
import Component from '@glimmer/component';
import { isArray } from '@ember/array';
import { action } from '@ember/object';

export default class CheckboxButton extends Component {
  get checked() {
    return this.args.groupValue.includes(this.value);
  }

  @action
  change() {
    assert(
      `Group value of a checkbox group (name=${this.name}) should be an array!`,
      isArray(this.groupValue)
    );
    if (this.groupValue.includes(this.value)) {
      this.groupValue.removeObject(this.value);
    } else {
      this.groupValue.pushObject(this.value);
    }

    this.set('groupValue', this.groupValue);
  }
}
