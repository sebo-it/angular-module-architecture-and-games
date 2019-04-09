import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { LogicService } from '../logic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from '../session-storage.service';
import { Location } from '@angular/common';
import { fade } from 'src/app/animations/fade';
import { Subscription } from 'rxjs';
import { GameState } from '../gameState';
import { map } from 'rxjs/operators';
import { ArrayCell } from '../array-cell';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  animations: [fade]
})
export class BoardComponent implements OnInit, OnDestroy {

  gameArray: string[][];
  // arrayWithWinFields: string[][] = [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']];
  occupiedFieldAlertVisible: boolean = false;

  // boardArraySubscription: Subscription;
  // endGameResultSubscription: Subscription;

  someFieldOfGameStateSubscription: Subscription;
  winFieldsArray: ArrayCell[] = [];
  isCanvasInDOM: boolean = false;


  canvas: ElementRef;
  @ViewChild('canvas') set canvasRef(canvasRef: ElementRef) {
    this.canvas = canvasRef;
  }

  @ViewChild('boardAsTable') boardAsTable: ElementRef;

  constructor(
    private _logicService: LogicService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _sessionStorageService: SessionStorageService,
    private _location: Location
  ) { }

  ngOnInit() {
    // alternative way to get data from sessionStorage, using generic single field downloader
    // this.boardArraySubscription = this._sessionStorageService.getOneFieldOfStateSubject$<string[][]>('boardArray').subscribe((receivedBoardArray) => {
    //   this.gameArray = receivedBoardArray;
    // });

    // add typing
    // this.endGameResultSubscription = this._sessionStorageService.getOneFieldOfStateSubject$<string>('endGameResult').subscribe( (endGameResult) => {
    //   if (endGameResult) {
    //     // this.arrayWithWinFields = [['', 'X', 'X', 'X'], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']];
    //     // setTimeout(() => {
    //       this._router.navigate(['../result'], { relativeTo: this._activatedRoute });
    //     // }, 4000);
    //   }
    // });

    // Alternative way using RxJS map operator. Needed imports was temporarily removed.
    this.someFieldOfGameStateSubscription = this._sessionStorageService.gameState$.pipe(
      map((receivedGameState: GameState) => ({
        boardArray: receivedGameState.boardArray,
        endGameResult: receivedGameState.endGameResult,
        winPositionsOfMarks: receivedGameState.winPositionsOfMarks
      }))
    )
      .subscribe((data) => {
        //  console.log('data: ', data);
        this.gameArray = data.boardArray;
        if (data.endGameResult) {
          // console.log('End game result: ', data.endGameResult);

          if ( data.endGameResult !== 'Draw' ) {
            // console.log('Winning fields: ', data.winPositionsOfMarks);
            this.winFieldsArray = data.winPositionsOfMarks;

            this.drawLineOnWinnerFields();

            setTimeout(() => {
              this._router.navigate(['../result'], { relativeTo: this._activatedRoute });
            }, 2000);
          } else {
            this._router.navigate(['../result'], { relativeTo: this._activatedRoute });
          }

        }
      });

  }

  drawLineOnWinnerFields(): void {
    // setTimeout with no delay is especially use to avoid problem with empty reference
    // to canvas, after become to DOM by *ngIf
    this.isCanvasInDOM = true;
    setTimeout(() => {
      const canvasNativeEl = this.canvas.nativeElement;
      const canvasCoordinates = canvasNativeEl.getBoundingClientRect();
      const canvasContext = canvasNativeEl.getContext('2d');

      const firstWinFieldArrayCell = this.winFieldsArray[0];
      const lastWinFieldArrayCell = this.winFieldsArray[this.winFieldsArray.length - 1];

      const boardAsTableNativeEl = this.boardAsTable.nativeElement;

      const firstWinField = boardAsTableNativeEl.getElementsByClassName(`row-${firstWinFieldArrayCell.rowIndex} col-${firstWinFieldArrayCell.columnIndex}`)[0];
      const lastWinField = boardAsTableNativeEl.getElementsByClassName(`row-${lastWinFieldArrayCell.rowIndex} col-${lastWinFieldArrayCell.columnIndex}`)[0];

      const firstWinFieldCoordinates = firstWinField.getBoundingClientRect();
      const lastWinFieldCoordinates = lastWinField.getBoundingClientRect();

      const lineCoordinatesObj = this.specifyCoordinatesOfWinningLine(canvasCoordinates, firstWinFieldArrayCell, firstWinFieldCoordinates, lastWinFieldArrayCell, lastWinFieldCoordinates);

      canvasContext.beginPath();
      canvasContext.lineCap = 'round';
      canvasContext.lineWidth = 10;
      canvasContext.strokeStyle = 'rgba(240, 240, 240, 0.7)';

      // animationStep has range (0 - 10) instead (0.1 - 1) to avoid problem with JS counting on doubles
      // so when I use different range, I divided by 10: 'distanceX * 0.1 * animationStep'
      let animationStep = 0;
      const distanceX = lineCoordinatesObj.endLeft - lineCoordinatesObj.startLeft;
      const distanceY = lineCoordinatesObj.endTop - lineCoordinatesObj.startTop;
      const drawingLineAnimation = setInterval(() => {
        animationStep += 1;
        if (animationStep === 10){ clearInterval(drawingLineAnimation) }
        canvasContext.clearRect(0, 0, canvasNativeEl.width, canvasNativeEl.height);
        canvasContext.moveTo(lineCoordinatesObj.startLeft, lineCoordinatesObj.startTop);
        canvasContext.lineTo(lineCoordinatesObj.startLeft + distanceX * 0.1 * animationStep, lineCoordinatesObj.startTop + distanceY * 0.1 * animationStep);
        canvasContext.stroke();
      }, 50);

    });

  }

  // Method count coordinates of final start(x,y) and end(x,y) coordinates, and return object
  // with these information
  private specifyCoordinatesOfWinningLine(canvasCoordinates, firstWinFieldArrayCell, firstWinFieldCoordinates, lastWinFieldArrayCell, lastWinFieldCoordinates) {
      let lineStartLeftCoordinate: number;
      let lineStartTopCoordinate: number;
      let lineEndLeftCoordinate: number;
      let lineEndTopCoordinate: number;

      if (firstWinFieldArrayCell.rowIndex === lastWinFieldArrayCell.rowIndex) {
        // winner fields are in row
        lineStartLeftCoordinate = firstWinFieldCoordinates.left - canvasCoordinates.left + 0.25 * firstWinFieldCoordinates.width;
        lineStartTopCoordinate = firstWinFieldCoordinates.top - canvasCoordinates.top + 0.5 * firstWinFieldCoordinates.height;

        lineEndLeftCoordinate = lastWinFieldCoordinates.left - canvasCoordinates.left + 0.75 * lastWinFieldCoordinates.width;
        lineEndTopCoordinate = lastWinFieldCoordinates.top - canvasCoordinates.top + 0.5 * lastWinFieldCoordinates.height;
      } else if (firstWinFieldArrayCell.columnIndex === lastWinFieldArrayCell.columnIndex) {
        // winning fields are in column
        lineStartLeftCoordinate = firstWinFieldCoordinates.left - canvasCoordinates.left + 0.5 * firstWinFieldCoordinates.width;
        lineStartTopCoordinate = firstWinFieldCoordinates.top - canvasCoordinates.top + 0.25 * firstWinFieldCoordinates.height;

        lineEndLeftCoordinate = lastWinFieldCoordinates.left - canvasCoordinates.left + 0.5 * lastWinFieldCoordinates.width;
        lineEndTopCoordinate = lastWinFieldCoordinates.top - canvasCoordinates.top + 0.75 * lastWinFieldCoordinates.height;
      } else if (firstWinFieldArrayCell.rowIndex < lastWinFieldArrayCell.rowIndex && firstWinFieldArrayCell.columnIndex < lastWinFieldArrayCell.columnIndex) {
        // winning fields are on slant, where line is drawing from left to right side
        lineStartLeftCoordinate = firstWinFieldCoordinates.left - canvasCoordinates.left + 0.25 * firstWinFieldCoordinates.width;
        lineStartTopCoordinate = firstWinFieldCoordinates.top - canvasCoordinates.top + 0.25 * firstWinFieldCoordinates.height;

        lineEndLeftCoordinate = lastWinFieldCoordinates.left - canvasCoordinates.left + 0.75 * lastWinFieldCoordinates.width;
        lineEndTopCoordinate = lastWinFieldCoordinates.top - canvasCoordinates.top + 0.75 * lastWinFieldCoordinates.height;
      } else if (firstWinFieldArrayCell.rowIndex < lastWinFieldArrayCell.rowIndex && firstWinFieldArrayCell.columnIndex > lastWinFieldArrayCell.columnIndex) {
        // winning fields are on slant, where line is drawing from right to left side
        lineStartLeftCoordinate = firstWinFieldCoordinates.left - canvasCoordinates.left + 0.75 * firstWinFieldCoordinates.width;
        lineStartTopCoordinate = firstWinFieldCoordinates.top - canvasCoordinates.top + 0.25 * firstWinFieldCoordinates.height;

        lineEndLeftCoordinate = lastWinFieldCoordinates.left - canvasCoordinates.left + 0.25 * lastWinFieldCoordinates.width;
        lineEndTopCoordinate = lastWinFieldCoordinates.top - canvasCoordinates.top + 0.75 * lastWinFieldCoordinates.height;
      }
    return { 'startLeft': lineStartLeftCoordinate, 'startTop': lineStartTopCoordinate,
              'endLeft': lineEndLeftCoordinate, 'endTop': lineEndTopCoordinate
           };
  }

  backURL(): void {
    this._location.back();
  }

  selectFieldHandler(row: number, col: number): void {
    if (this.gameArray[row][col]) {
      this.occupiedFieldAlertVisible = true;
      setTimeout( () => {
        this.occupiedFieldAlertVisible = false;
      }, 2000);
    } else {
      this._logicService.selectField(row, col);
    }
  }

  isWinnerField(row: number, col: number): boolean {
    for ( const currentArrayCellObj of this.winFieldsArray ) {
      if (currentArrayCellObj.rowIndex === row && currentArrayCellObj.columnIndex === col) {
        return true;
      }
    }
    return false;
  }

  ngOnDestroy(): void {
    // this.boardArraySubscription.unsubscribe();
    // this.endGameResultSubscription.unsubscribe();
    this.someFieldOfGameStateSubscription.unsubscribe();
  }

}
