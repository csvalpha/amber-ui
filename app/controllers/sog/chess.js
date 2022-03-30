import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SogChessController extends Controller {
  @tracked board = new Board();
}

const pieceVariantColorMapping = { dark: 'black', light: 'white' };
const playerVariantNameMapping = { dark: 'zwart', light: 'wit' };
class Board {
  @tracked players = [lightPlayer, darkPlayer];
  @tracked squares = [];
  constructor() {
    let squares = [];
    for (let i = 0; i < 8; i++) {
      let row = [];
      for (let j = 0; j < 8; j++) {
        row.push(
          new Square((i + j) % 2 === 0 ? lightVariant : darkVariant, this)
        );
      }
      squares.push(row);
    }
    let lightPieces = [];
    let darkPieces = [];
    for (let i = 0; i < 8; i++) {
      let pawn = new Piece(Pawn);
      this.place(pawn, squares[squares.length - 2][i]);
      lightPieces.push(pawn);
      pawn = new Piece(Pawn);
      this.place(pawn, squares[1][i]);
      darkPieces.push(pawn);
    }
    for (let i = 0; i < 8; i++) {
      let piece = new Piece(
        [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook][i]
      );
      this.place(piece, squares[squares.length - 1][i]);
      lightPieces.push(piece);
      piece = new Piece(
        [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook][i]
      );
      this.place(piece, squares[0][i]);
      darkPieces.push(piece);
    }
    this.players[0].setPieces(lightPieces);
    this.players[1].setPieces(darkPieces);

    this.squares = squares;
  }

  place(piece, square) {
    piece.setSquare(square);
    square.setPiece(piece);
  }

  get selectedPiece() {
    return this.squares.flat().find((square) => square.isSelected)?.piece;
  }

  moveSelectedPieceTo(destinationSquare) {
    // todo: at some point, check move legality
    // todo: animate moves
    const piece = this.selectedPiece;
    const player = piece.player;
    if (destinationSquare.piece) {
      player.addCapture(destinationSquare.piece);
      destinationSquare.piece.setSquare(null);
    }
    const originSquare = piece.square;
    originSquare.setPiece(null);
    originSquare.toggleSelected();
    piece.setSquare(destinationSquare);
    destinationSquare.setPiece(piece);
  }
}
class Variant {
  constructor(name) {
    this.name = name;
  }

  toString() {
    return this.name;
  }
}
const darkVariant = new Variant('dark');
const lightVariant = new Variant('light');

class Player {
  @tracked variant;
  @tracked pieces = null;
  @tracked captures = [];
  constructor(variant) {
    this.variant = variant;
  }

  get name() {
    return playerVariantNameMapping[this.variant];
  }

  setPieces(pieces) {
    this.pieces = pieces;
    this.pieces.forEach((piece) => {
      piece.setPlayer(this);
    });
  }

  addCapture(capture) {
    this.captures = [...this.captures, capture]; // simply pushing doesn't trigger a tracked update
  }

  toString() {
    return this.variant.toString() + ' player';
  }
}
let darkPlayer = new Player(darkVariant);
let lightPlayer = new Player(lightVariant);

class PieceType {
  @tracked name;
  constructor(name) {
    this.name = name;
  }

  toString() {
    return this.name;
  }
}
let Pawn = new PieceType('pawn');
let Knight = new PieceType('knight');
let Bishop = new PieceType('bishop');
let Rook = new PieceType('rook');
let Queen = new PieceType('queen');
let King = new PieceType('king');
class Piece {
  @tracked pieceName;
  @tracked variant = null;
  @tracked player = null;
  @tracked square = null;
  constructor(pieceName) {
    this.pieceName = pieceName;
  }

  get icon() {
    return 'chess-' + this.pieceName;
  }
  get color() {
    return pieceVariantColorMapping[this.variant?.name];
  }
  setPlayer(player) {
    this.player = player;
    this.variant = this.player.variant;
  }

  setSquare(square) {
    this.square = square;
  }

  toString() {
    return (
      (this.variant?.toString() ?? 'variantless') +
      ' ' +
      this.pieceName.toString()
    );
  }
}
class Square {
  @tracked isSelected = false;
  @tracked variant;
  @tracked piece = null;
  @tracked board;
  constructor(variant, board) {
    this.variant = variant;
    this.board = board;
  }

  setPiece(piece) {
    this.piece = piece;
  }

  toString() {
    return (
      this.variant.toString() + ' square ' + (this.piece?.toString() ?? 'empty')
    );
  }
  toggleSelected() {
    this.isSelected = !this.isSelected;
  }
  @action
  onClick() {
    if (!this.board.selectedPiece || this.board.selectedPiece === this.piece) {
      if (this.piece) {
        this.toggleSelected();
      }
    } else {
      this.board.moveSelectedPieceTo(this);
    }
  }
}
