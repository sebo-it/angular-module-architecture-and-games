import { Component, OnInit, Input } from '@angular/core';
import { SessionStorageService } from '../session-storage.service';
import { fadeIn } from 'src/app/animations/fade-in';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
  animations: [fadeIn]
})
export class InstructionsComponent implements OnInit {

  @Input() infoContent: string;

  infoContentObj = {
    'board': {
      'target-title': 'Game target: ',
      'target-content': 'the winner is who putts on the board ',
      'quantityOfMarksToWin': 3,
      'target-content-continue': ' its pawns next to each other ( vertical / horizontal / slant).',
      'game-title': 'Game: ',
      'game': 'players alternately move, indicating an empty space where their pawn will be inserted.'
    },
    'settings': {
      'board-size-title': 'Board:',
      'board-size-content': 'buttons allow you to choose the size of the board and game mode. On the 3x3 board, the winner is the player who places 3 pieces next to each other. Larger boards require 4 pieces for this purpose.',
      'pawn-title': 'Pawns:',
      'pawn-content': "O and X buttons allow you to select the first player's piece. The second player will receive the remaining piece"
    }
  };

  contentIsVisible: boolean = false;
  // contentIsVisible: boolean = true;
  exitAnimationIsVisible: boolean = false;

  constructor(private _sessionStorage: SessionStorageService) { }

  ngOnInit() {}

  instructionClickHandler(): void{

    if(this.infoContent === 'board'){
      const boardSize: number = this._sessionStorage.getSettingsValue<number>('boardSize');
      this.infoContentObj.board.quantityOfMarksToWin = boardSize === 3 ? 3 : 4 ;
    }

    this.contentIsVisible = true;
  }

  instructionExit(): void{
    this.exitAnimationIsVisible = true;
    setTimeout( () =>{
      this.contentIsVisible = false;
      this.exitAnimationIsVisible = false;
    }, 500);
  }

}
