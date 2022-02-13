import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class SogChessController extends Controller {
  @tracked board = new Board()



}

class Board {
  @tracked players = [lightPlayer, darkPlayer]
  @tracked squares = []
  constructor() {
    let squares = []
    for (let i = 0; i < 8; i++) {
      let row = []
      for (let j = 0; j < 8; j++) {
        row.push(new Square(((i + j) % 2) === 0 ? lightColor : darkColor))
      }
      squares.push(row)
    }
    let lightPieces = []
    let darkPieces = []
    for (let i = 0; i < 8; i++) {
      let pawn = new Piece(Pawn)
      this.place(pawn, squares[squares.length - 1][i])
      lightPieces.push(pawn)
      pawn = new Piece(Pawn)
      this.place(pawn, squares[1][i])
      darkPieces.push(pawn)
    } for (let i = 0; i < 8; i++) {
      let piece = new Piece([Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook][i])
      this.place(piece, squares[squares.length - 1][i])
      lightPieces.push(piece)
      piece = new Piece([Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook][i])
      this.place(piece, squares[0][i])
      darkPieces.push(piece)
    }
    this.players[0].setPieces(lightPieces)
    this.players[1].setPieces(darkPieces)

    this.squares = squares
  }

  place(piece, square) {
    piece.setSquare(square)
    square.setPiece(piece)
  }


  makeMove(piece, destinationSquare) {
    // todo: at some point, check move legality
    // todo: animate moves?
    const player = piece.player;
    if (destinationSquare.piece) {
      player.addCapture(destinationSquare.piece);
    }
    piece.setSquare(destinationSquare)
    destinationSquare.setPiece(piece)
  }
}
class Color {
  constructor(name) {
    this.name = name
  }
  toString() {
    return this.name
  }
}
const darkColor = new Color('dark')
const lightColor = new Color('light')

class Player {
  @tracked color
  @tracked pieces = null
  @tracked captures = []
  constructor(color) {
    this.color = color
  }
  setPieces(pieces) {
    this.pieces = pieces
    this.pieces.forEach(piece => {
      piece.setPlayer(this)
    })
  }
  addCapture(capture) {
    this.captures.push(capture)
  }
  toString() {
    return this.color.toString() + ' player'
  }
}
let darkPlayer = new Player(darkColor)
let lightPlayer = new Player(lightColor)


class PieceType {
  @tracked name
  constructor(name) {
    this.name = name
  }
  toString() {
    return this.name
  }
}
let Pawn = new PieceType('pawn')
let Knight = new PieceType('knight')
let Bishop = new PieceType('bishop')
let Rook = new PieceType('rook')
let Queen = new PieceType('queen')
let King = new PieceType('king')
class Piece {
  @tracked pieceName
  @tracked color = null
  @tracked player = null
  @tracked square = null
  constructor(pieceName) {
    this.pieceName = pieceName
  }
  setPlayer(player) {
    this.player = player
    this.color = this.player.color
  }
  setSquare(square) {
    this.square = square
  }
  toString() {
    return (this.color ? this.color.toString() : 'colorless') + ' ' + this.pieceName.toString()
  }
}
class Square {
  @tracked color
  @tracked piece = null
  constructor(color) {
    this.color = color
  }
  setPiece(piece) {
    this.piece = piece
  }
  toString() {
    return this.color.toString() + ' square ' + (this.piece ? this.piece.toString() : 'empty')
  }
}
