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
    this.squares = squares
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
  makeMove(piece, destinationSquare) {
    piece.setSquare(destinationSquare) // todo: animate this?
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
    if (this.square.piece) {
      let capture = this.square.piece
      this.player.addCapture(capture)
    }
    this.square.setPiece(this)
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
