import { Injectable, OnDestroy } from '@angular/core';
import { Player } from './player';
import { TicTacToeModule } from './tic-tac-toe.module';
import { GameState } from './gameState';
import { SessionStorageService } from './session-storage.service';
import { GameSettings } from './gameSettings';
import { Subscription } from 'rxjs';
import { ArrayCell } from './array-cell';

@Injectable({
  providedIn: TicTacToeModule
})
export class LogicService implements OnDestroy {
  private game: GameState;
  gameStateSubscription: Subscription;

  constructor(private _sessionStorageService: SessionStorageService) {

    this.gameStateSubscription = this._sessionStorageService.gameState$.subscribe( (receivedGameState) => {
      if (receivedGameState) {
        // console.log('logicService: gameState: ', receivedGameState);
        this.game = receivedGameState;
      }
    });

  }

  public newGame(gameSettings: GameSettings): void {

    const quantityOfMarksToWin: number = gameSettings.boardSize === 3 ? 3 : 4;
    const minQuantityOfMovesToWin: number = quantityOfMarksToWin === 3 ? 5 : 7;
    const startMark: string = this.drawStartMark();

    this.game = new GameState(
      this.createBoard(gameSettings.boardSize),
      new Player(gameSettings.markForFirstPlayer, 0),
      new Player(this.getOpponentPlayerMark(gameSettings.markForFirstPlayer), 0),
      startMark,
      1,
      quantityOfMarksToWin,
      minQuantityOfMovesToWin,
      null,
      [],
      startMark
    );

    this._sessionStorageService.gameStateSubject = this.game;
    this.logAllInfo();

  }

  public nextGame(gameSettings: GameSettings): void {

    const quantityOfMarksToWin: number = gameSettings.boardSize === 3 ? 3 : 4;
    const minQuantityOfMovesToWin: number = quantityOfMarksToWin === 3 ? 5 : 7;
    const startMark: string = this.getOpponentPlayerMark(this.game.startMark);

    this.game = new GameState(
      this.createBoard(gameSettings.boardSize),
      this.game.player1,
      this.game.player2,
      startMark,
      1,
      quantityOfMarksToWin,
      minQuantityOfMovesToWin,
      null,
      [],
      startMark
    );

    this._sessionStorageService.gameStateSubject = this.game;

    this.logAllInfo();
  }

  private createBoard(dimension: number): string[][] {
    const board = [];

    for (let i = 0; i < dimension; i++) {
      board.push([]);
      for (let j = 0; j < dimension; j++) {
        board[i][j] = '';
      }
    }

    return board;
  }

  private getOpponentPlayerMark(mark: string): string {
    return mark === 'X' ? 'O' : 'X';
  }

  private drawStartMark(): string {
      const drawResult = Math.floor(Math.random() * 2);
      return drawResult === 0 ? 'X' : 'O';
  }

  // Tag field on the board using row and col number.
  // If the field is empty, insert player mark and launch function this.processTurn
  // If the field is occupied display this information.
  public selectField(row: number, col: number): void {
    const selectedField = this.game.boardArray[row][col];
    if (!selectedField) {
      this.game.boardArray[row][col] = this.game.turnOfPlayer;
      this.processTurn();
    } else {
      console.log('This field is occupied, choose other one.');
    }
    this._sessionStorageService.gameStateSubject = this.game;
  }

  // Check if current turn number > minimal turns to win
  // if true: launch check result function. If function return the winner, display information and stop.
  // if there isn't winner, change player turn and increment round counter
  processTurn(): void {
    if (this.game.roundNumber >= this.game.minQuantityOfMovesToWin) {
      const result = this.specifyResult();
      if (result) {
        if (result === 'draw') {
          // console.log('draw');
          this.game.endGameResult = 'Draw';
        } else {
          this.game.endGameResult = result;

          const winner = this.translateMarkToPlayer(result);
          winner.winsQuantity++;

          this._sessionStorageService.gameStateSubject = this.game;
          // console.log('The winner is: ', result);
          return;
        }
      }
    }

    // change player turn
    this.game.turnOfPlayer = this.getOpponentPlayerMark(this.game.turnOfPlayer);

    this.game.roundNumber++;
    this._sessionStorageService.gameStateSubject = this.game;
  }

  isPlayer(variable: any): variable is Player {
    return (<Player>variable).mark !== undefined;
  }

  // Function checks result and returns:
  //  - Player object when somebody wins
  //  - String value - 'draw' when draw
  //  - null when game isn't finished
  specifyResult(): string | null {

    let partialSearchResult = this.searchInRows();
    if (partialSearchResult) return partialSearchResult;

    partialSearchResult = this.searchInColumns();
    if (partialSearchResult) return partialSearchResult;

    partialSearchResult = this.searchInMainDiagonal();
    if (partialSearchResult) return partialSearchResult;

    partialSearchResult = this.searchInSecondDiagonal();
    if (partialSearchResult) return partialSearchResult;

    if (this.game.boardArray.length > 4) {
      partialSearchResult = this.searchAboveMainDiagonal();
      if (partialSearchResult) return partialSearchResult;

      partialSearchResult = this.searchBelowMainDiagonal();
      if (partialSearchResult) return partialSearchResult;

      partialSearchResult = this.searchAboveSecondDiagonal();
      if (partialSearchResult) return partialSearchResult;

      partialSearchResult = this.searchBelowSecondDiagonal();
      if (partialSearchResult) return partialSearchResult;
    }

    // if above instructions didn't break function and it's last round
    // it returns 'draw'
    if (this.game.roundNumber === this.game.boardArray.length * this.game.boardArray.length) {
      return 'draw';
    }

    return null;
  }

  searchInRows(): string | null {
    let checkingMark: string;
    let commonMarkCounter: number;

    for (let i = 0; i < this.game.boardArray.length; i++) {
      checkingMark = this.game.boardArray[i][0];
      commonMarkCounter = 0;
      for (let j = 0; j < this.game.boardArray.length; j++) {
        const currentFieldMark = this.game.boardArray[i][j];

        if (currentFieldMark !== checkingMark) {
          checkingMark = currentFieldMark;
          commonMarkCounter = 1;

          this.game.winPositionsOfMarks = [];
          this.game.winPositionsOfMarks.push(new ArrayCell(i, j));
        } else if (currentFieldMark === this.game.player1.mark || currentFieldMark === this.game.player2.mark) {
          // increment counter if currentFieldMark is same like before and it belongs to player (different then empty field)
          // empty fields haven't counters
          commonMarkCounter++;
          this.game.winPositionsOfMarks.push(new ArrayCell(i, j));
        }

        if (commonMarkCounter === this.game.quantityOfMarksToWin) {
          return checkingMark;
        }
      }
      this.game.winPositionsOfMarks = [];
    }

    return null;
  }

  searchInColumns(): string | null {
    let checkingMark: string;
    let commonMarkCounter: number;

    for (let j = 0; j < this.game.boardArray.length; j++) {
      checkingMark = this.game.boardArray[0][j];
      commonMarkCounter = 0;
      for (let i = 0; i < this.game.boardArray.length; i++) {
        const currentFieldMark = this.game.boardArray[i][j];

        if (currentFieldMark !== checkingMark) {
          checkingMark = currentFieldMark;
          commonMarkCounter = 1;
          this.game.winPositionsOfMarks = [];
          this.game.winPositionsOfMarks.push(new ArrayCell(i, j));
        } else if (currentFieldMark === this.game.player1.mark || currentFieldMark === this.game.player2.mark) {
          // add to counter if currentFieldMark is same like before and it belongs to player (different from empty field)
          // empty fields haven't counters
          commonMarkCounter++;
          this.game.winPositionsOfMarks.push(new ArrayCell(i, j));
        }

        if (commonMarkCounter === this.game.quantityOfMarksToWin) {
          return checkingMark;
        }

      }
      this.game.winPositionsOfMarks = [];
    }

    return null;
  }

  // search in slant (from left-top)
  searchInMainDiagonal(): string | null {
    let checkingMark: string;
    let commonMarkCounter: number = 0;

    for (let i = 0; i < this.game.boardArray.length; i++) {
      const currentFieldMark = this.game.boardArray[i][i];
      if (currentFieldMark !== checkingMark) {
        checkingMark = currentFieldMark;
        commonMarkCounter = 1;

        this.game.winPositionsOfMarks = [];
        this.game.winPositionsOfMarks.push(new ArrayCell(i, i));
      } else if (currentFieldMark === this.game.player1.mark || currentFieldMark === this.game.player2.mark) {
        // add to counter if currentFieldMark is same like before and it belongs to player (different from empty field)
        // empty fields haven't counters
        commonMarkCounter++;
        this.game.winPositionsOfMarks.push(new ArrayCell(i, i));
      }

      if (commonMarkCounter === this.game.quantityOfMarksToWin) {
        return checkingMark;
      }
    }

    this.game.winPositionsOfMarks = [];
    return null;
  }

  // Search in slant, starts in top-right corner
  searchInSecondDiagonal(): string | null {
    let checkingMark: string;
    let commonMarkCounter: number = 0;
    let j = this.game.boardArray.length - 1;

    for (let i = 0; i < this.game.boardArray.length; i++) {
      const currentFieldMark = this.game.boardArray[i][j];
      if (currentFieldMark !== checkingMark) {
        checkingMark = currentFieldMark;
        commonMarkCounter = 1;
        this.game.winPositionsOfMarks = [];
        this.game.winPositionsOfMarks.push(new ArrayCell(i, j));
      } else if (currentFieldMark === this.game.player1.mark || currentFieldMark === this.game.player2.mark) {
        // add to counter if currentFieldMark is same like before and it belongs to player (different from empty field)
        // empty fields haven't counters
        commonMarkCounter++;
        this.game.winPositionsOfMarks.push(new ArrayCell(i, j));
      }

      if (commonMarkCounter === this.game.quantityOfMarksToWin) {
        return checkingMark;
      }
      j--;
    }

    this.game.winPositionsOfMarks = [];
    return null;
  }

  // Function checks slants above main diagonal only, when there is possible to find 4 marks
  // Example with visible checking slants:
  // - x y - - -
  // - - x y - -
  // - - - x y -
  // - - - - x y
  // - - - - - x
  // - - - - - -
  searchAboveMainDiagonal(): string | null {
    let checkingMark: string;
    let commonMarkCounter: number;
    let i: number;

    // console.log('function searchAboveMainDiagonal start');

    for (let firstRowField = 1; firstRowField <= this.game.boardArray.length - 4; firstRowField++) {
      commonMarkCounter = 0;
      i = 0;
      for (let j = firstRowField; j < this.game.boardArray.length; j++) {
        const currentFieldMark = this.game.boardArray[i][j];

        // console.log(i, j);

        if (currentFieldMark !== checkingMark) {
          checkingMark = currentFieldMark;
          commonMarkCounter = 1;
          this.game.winPositionsOfMarks = [];
          this.game.winPositionsOfMarks.push(new ArrayCell(i, j));
        } else if (currentFieldMark === this.game.player1.mark || currentFieldMark === this.game.player2.mark) {
          // add to counter if currentFieldMark is same like before and it belongs to player (different from empty field)
          // empty fields haven't counters
          commonMarkCounter++;
          this.game.winPositionsOfMarks.push(new ArrayCell(i, j));
        }

        if (commonMarkCounter === this.game.quantityOfMarksToWin) {
          return checkingMark;
        }

        i++;
      }
      this.game.winPositionsOfMarks = [];
    }
    return null;
  }

  // function checks slants below main diagonal only, when there is possible to find 4 marks
  // example with visible checking slants:
  // - - - - - -
  // x - - - - -
  // y x - - - -
  // - y x - - -
  // - - y x - -
  // - - - y x -
  searchBelowMainDiagonal(): string | null {
    let checkingMark: string;
    let commonMarkCounter: number = 0;
    let j: number;

    // console.log('function searchBelowMainDiagonal starts');

    for (let firstColField = 1; firstColField <= this.game.boardArray.length - 4; firstColField++) {
      j = 0;
      for (let i = firstColField; i < this.game.boardArray.length; i++) {
        const currentFieldMark = this.game.boardArray[i][j];
        // console.log(i, j);

        if (currentFieldMark !== checkingMark) {
          checkingMark = currentFieldMark;
          commonMarkCounter = 1;
          this.game.winPositionsOfMarks = [];
          this.game.winPositionsOfMarks.push(new ArrayCell(i, j));
        } else if (currentFieldMark === this.game.player1.mark || currentFieldMark === this.game.player2.mark) {
          // add to counter if currentFieldMark is same like before and it belongs to player (different from empty field)
          // empty fields haven't counters
          commonMarkCounter++;
          this.game.winPositionsOfMarks.push(new ArrayCell(i, j));
        }

        if (commonMarkCounter === this.game.quantityOfMarksToWin) {
          return checkingMark;
        }

        j++;
      }
      commonMarkCounter = 0;
      this.game.winPositionsOfMarks = [];
    }

    return null;
  }

  searchAboveSecondDiagonal(): string | null {
    let checkingMark: string;
    let commonMarkCounter: number;

    // console.log('function searchAboveSecondDiagonal starts:');

    for (let firstRowField = 3; firstRowField < this.game.boardArray.length - 1; firstRowField++) {
      let j = firstRowField;
      commonMarkCounter = 0;

      for (let i = 0; i <= firstRowField; i++) {
        // console.log(i, j);

        const currentFieldMark = this.game.boardArray[i][j];

        if (currentFieldMark !== checkingMark) {
          checkingMark = currentFieldMark;
          commonMarkCounter = 1;
          this.game.winPositionsOfMarks = [];
          this.game.winPositionsOfMarks.push(new ArrayCell(i, j));
        } else if (currentFieldMark === this.game.player1.mark || currentFieldMark === this.game.player2.mark) {
          // add to counter if currentFieldMark is same like before and it belongs to player (different from empty field)
          // empty fields haven't counters
          commonMarkCounter++;
          this.game.winPositionsOfMarks.push(new ArrayCell(i, j));
        }

        if (commonMarkCounter === this.game.quantityOfMarksToWin) {
          return checkingMark;
        }

        j--;
      }
      this.game.winPositionsOfMarks = [];
    }
    return null;

  }

  searchBelowSecondDiagonal(): string | null {
    let checkingMark: string;
    let commonMarkCounter: number;

    // console.log('function searchBelowSecondDiagonal starts:');

    for (let lastRowField = 1; lastRowField <= this.game.boardArray.length - 4; lastRowField++) {
      let j = lastRowField;
      commonMarkCounter = 0;

      for (let i = this.game.boardArray.length - 1; i >= lastRowField; i--) {
        // console.log(i, j);

        const currentFieldMark = this.game.boardArray[i][j];

        if (currentFieldMark !== checkingMark) {
          checkingMark = currentFieldMark;
          commonMarkCounter = 1;
          this.game.winPositionsOfMarks = [];
          this.game.winPositionsOfMarks.push(new ArrayCell(i, j));
        } else if (currentFieldMark === this.game.player1.mark || currentFieldMark === this.game.player2.mark) {
          // add to counter if currentFieldMark is same like before and it belongs to player (different from empty field)
          // empty fields haven't counters
          commonMarkCounter++;
          this.game.winPositionsOfMarks.push(new ArrayCell(i, j));
        }

        if (commonMarkCounter === this.game.quantityOfMarksToWin) {
          return checkingMark;
        }

        j++;
      }
      this.game.winPositionsOfMarks = [];
    }
    return null;

  }

  // Take string with 'mark' and return Player object which use this mark.
  translateMarkToPlayer(mark: string): Player {
    return mark === this.game.player1.mark ? this.game.player1 : this.game.player2;
  }

  logAllInfo(): void {
    console.log('Board: ', this.game.boardArray);
    console.log('Player1: ', this.game.player1);
    console.log('Player2: ', this.game.player2);
    console.log('Turn of player: ', this.game.turnOfPlayer);
    console.log('Round number: ', this.game.roundNumber);
  }

  ngOnDestroy(): void {
    this.gameStateSubscription.unsubscribe();
  }

}
