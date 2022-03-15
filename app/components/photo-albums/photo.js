import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class Photo extends Component {
  @tracked
  showExif = false;
  @action
  toggleShowExif() {
    this.showExif = !this.showExif;
  }
}
