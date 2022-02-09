import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Square extends Component {
  get color() {
    return this.args.square.color.name === 'dark' ? 'black' : 'white'
  }
}
