import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class PublicRoomAdvertCardComponent extends Component {
  @action
  open(advert) {
    if (this.args.open) {
      this.args.open(advert);
    }
  }
}
