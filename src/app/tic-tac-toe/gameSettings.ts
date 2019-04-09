export class GameSettings {
  boardSize: number;
  markForFirstPlayer: string;

  constructor(boardSize: number, mark: string) {
    this.boardSize = boardSize;
    this.markForFirstPlayer = mark;
  }
}
