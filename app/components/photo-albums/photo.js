import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Photo extends Component {
  @tracked
  showExif = false;

  get showInfo() {
    return this.args.showInfo ?? true;
  }

  @action
  toggleShowExif() {
    this.showExif = !this.showExif;
  }
}
