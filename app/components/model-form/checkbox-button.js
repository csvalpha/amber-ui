import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CheckboxButtonComponent extends Component {
  type = 'checkbox';

  @tracked checked = false;

  @action
  change(event) {
    this.checked = event.target.checked;
  }
}
