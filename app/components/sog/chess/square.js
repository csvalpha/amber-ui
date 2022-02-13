import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Square extends Component {

  // todo: implement more themes/colormappings
  @tracked
  squareColorMapping = {'dark': 'dark', 'light': 'light'}
  pieceColorMapping = {'dark': 'black', 'light': 'white'}

  get colorClass() {
    return this.args.square.color ? 'bg-' + this.squareColorMapping[this.args.square.color.name] : null
  }
  get pieceIcon() {
    return this.args.square.piece ? `chess-${this.args.square.piece.pieceName}` : null
  }
  get pieceColor() {
    return (this.args.square.piece && this.args.square.piece.player) ? 'text-' + this.pieceColorMapping[this.args.square.piece.player.color.name] : null
  }
}
