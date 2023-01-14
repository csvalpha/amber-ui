import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class FrontpageActivityCardSmall extends Component {
  get style() {
    return htmlSafe(
      `background-image: url(${this.args.activity.coverPhotoUrlOrDefault})`
    );
  }
}
