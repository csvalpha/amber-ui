import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class Photo extends Component {
  @service abilities;

  @tracked
  showExif = false;

  get showInfo() {
    return this.args.showInfo ?? true;
  }

  get showComments() {
    return this.showInfo && this.abilities.can('show photo-tags');
  }

  @action
  toggleShowExif() {
    this.showExif = !this.showExif;
  }
}
