import Component from '@ember/component';
import { htmlSafe } from '@ember/string';

export default class SpecialPromo extends Component {
  get backgroundImageStyle() {
    return htmlSafe(
      `background: url('${this.backgroundImage}'); background-size: cover; background-position: center;"`
    );
  }
}
