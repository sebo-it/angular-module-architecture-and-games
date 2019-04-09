import { Player } from './player';
import { ArrayCell } from './array-cell';

export class GameState {
  // boardArray: string[][];
  // player1: Player;
  // player2: Player;
  // turnOfPlayer: Player;
  // roundNumber: number;
  // // quantityOfMarksToWin - quantity of marks in row which gives a win (end game)
  // quantityOfMarksToWin: number;
  // minQuantityOfMovesToWin: number;
  // // endGameResult: Player | string;
  // endGameResult: string | null;
  // winPositionsOfMarks: ArrayCell[];

  constructor(
    public boardArray: string[][],
    public player1: Player,
    public player2: Player,
    public turnOfPlayer: string,
    public roundNumber: number,
    // quantityOfMarksToWin - quantity of marks in row which gives a win (end game)
    public quantityOfMarksToWin: number,
    public minQuantityOfMovesToWin: number,
    public endGameResult: string | null,
    public winPositionsOfMarks: ArrayCell[],
    public startMark: string
  ) {}
}
