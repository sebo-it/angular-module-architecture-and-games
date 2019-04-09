import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Player } from '../player';
import { SessionStorageService } from '../session-storage.service';
import { GameState } from '../gameState';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-players-bar',
  templateUrl: './players-bar.component.html',
  styleUrls: ['./players-bar.component.css']
})
export class PlayersBarComponent implements OnInit, OnDestroy {
  player1: Player;
  player2: Player;
  winnerMark: string;

  gameStateSubscription: Subscription;

  @Input() parentComponent: string;

  constructor(private _sessionStorageService: SessionStorageService) { }

  ngOnInit() {
    // this._sessionStorageService.getOneFieldOfStateSubject$<Player>('player1').subscribe((receivedPlayer1) => {
    //   this.player1 = receivedPlayer1;
    // });

    // this._sessionStorageService.getOneFieldOfStateSubject$<Player>('player2').subscribe((receivedPlayer2) => {
    //   this.player2 = receivedPlayer2;
    // });

    // this._sessionStorageService.getOneFieldOfStateSubject$<string>('endGameResult').subscribe((receivedendGameResult)=>{
    //   this.winnerMark = receivedendGameResult;
    // });

    this.gameStateSubscription = this._sessionStorageService.gameState$.subscribe((receivedGameState: GameState) => {
      this.player1 = receivedGameState.player1;
      this.player2 = receivedGameState.player2;
      this.winnerMark = receivedGameState.endGameResult;

    });
  }

  ngOnDestroy(): void {
    this.gameStateSubscription.unsubscribe();
  }

}
