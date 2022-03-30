import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Square extends Component {
  // todo: implement more themes/colormappings
  @tracked
  squareColorMapping = { dark: 'dark', light: 'light' };
  pieceColorMapping = { dark: 'black', light: 'white' };
  strokeColorMapping = { dark: 'white', light: 'black' };

  get color() {
    return this.args.square.color
      ? this.squareColorMapping[this.args.square.color.name]
      : null;
  }
  get pieceIcon() {
    return this.args.square.piece
      ? `chess-${this.args.square.piece.pieceName}`
      : null;
    // return this.args.square.piece ? 'chess-bishop' : null;
  }
  get pieceColor() {
    return this.pieceColorMapping[this.args.square.piece?.player?.color?.name];
  }
  get strokeColor() {
    return this.strokeColorMapping[this.color];
  }
}
