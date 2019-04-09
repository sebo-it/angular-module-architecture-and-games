import { Component, OnInit } from '@angular/core';
import { LogicService } from '../logic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStorageService } from '../session-storage.service';
import { GameSettings } from '../gameSettings';
import { fade } from 'src/app/animations/fade';

@Component({
  selector: 'app-result-screen',
  templateUrl: './result-screen.component.html',
  styleUrls: ['./result-screen.component.css'],
  animations: [fade]
})
export class ResultScreenComponent implements OnInit {

  gameResult: string;

  constructor(
    private _logicService: LogicService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _sessionStorageService: SessionStorageService
  ) { }

  ngOnInit() {
    this.gameResult = this._sessionStorageService.getGameStateValue<string>('endGameResult');
    console.log('end', this.gameResult);
  }

  nextGameHandler(): void {
    const gameSettings: GameSettings = this._sessionStorageService.gameSettingsSubject;
    this._logicService.nextGame(gameSettings);
    this._router.navigate(['../board'], { relativeTo: this._activatedRoute });
  }

  newGameHandler(): void {
    // set sessionStorage (settings window with board size and mark) to default
    // this.gameSettings.boardSize = 3;
    // this.gameSettings.markForFirstPlayer = 'O';
    // this._sessionStorageService.gameSettingsSubject = this.gameSettings;
    this._sessionStorageService.removeSessionStorageItem('gameSettings');
    this._sessionStorageService.gameSettingsSubject = null;
    this._router.navigate(['../settings'], { relativeTo: this._activatedRoute });
  }

}
