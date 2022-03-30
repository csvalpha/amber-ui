import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Square extends Component {
  // todo: implement more themes/colormappings
  @tracked
  squareVariantVariantMapping = { dark: 'dark', light: 'light' };

  strokeVariantColorMapping = { dark: 'white', light: 'black' };

  get variant() {
    return this.args.square.variant?.name;
  }

  get bgColor() {
    return this.args.square.isSelected ? 'bg-primary' : 'bg-' + this.variant;
  }

  get pieceName() {
    return this.args.square.piece?.pieceName;
  }

  get pieceColor() {
    return this.args.square.piece?.color;
    // return this.pieceVariantColorMapping[
    //   this.args.square.piece?.player?.variant?.name
    // ];
  }

  get strokeColor() {
    return this.strokeVariantColorMapping[this.variant];
  }
}
