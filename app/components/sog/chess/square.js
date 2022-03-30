import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Square extends Component {
  // todo: implement more themes/colormappings
  @tracked
  squareColorMapping = { dark: 'dark', light: 'light' };

  pieceColorMapping = { dark: 'black', light: 'white' };
  strokeColorMapping = { dark: 'white', light: 'black' };

  get color() {
    return this.squareColorMapping[this.args.square.color?.name];
  }

  get pieceName() {
    return this.args.square.piece?.pieceName;
  }

  get pieceIcon() {
    return 'chess-' + this.pieceName;
  }

  get pieceColor() {
    return this.pieceColorMapping[this.args.square.piece?.player?.color?.name];
  }

  get strokeColor() {
    return this.strokeColorMapping[this.color];
  }
}
