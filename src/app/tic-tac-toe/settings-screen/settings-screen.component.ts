import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStorageService } from '../session-storage.service';
import { LogicService } from '../logic.service';
import { GameSettings } from '../gameSettings';
import { fade } from 'src/app/animations/fade';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings-screen',
  templateUrl: './settings-screen.component.html',
  styleUrls: ['./settings-screen.component.css'],
  animations: [fade]
})
export class SettingsScreenComponent implements OnInit, OnDestroy {

  gameSettings: GameSettings;
  gameSettingsSubscription: Subscription;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _sessionStorageService: SessionStorageService,
    private _logicService: LogicService
  ) { }

  ngOnInit() {
    this.gameSettingsSubscription = this._sessionStorageService.gameSettings$.subscribe((receivedGameSettings) => {
      if (receivedGameSettings === null) {
        this.gameSettings = new GameSettings(3, 'O');
        // this.gameSettings.boardSize = 3;
        // this.gameSettings.markForFirstPlayer = 'O';
        this._sessionStorageService.gameSettingsSubject = this.gameSettings;
      } else {
        this.gameSettings = receivedGameSettings;
      }
    });
  }

  selectBoardSize(choosedSize: number): void {
    this.gameSettings.boardSize = choosedSize;
  }

  selectMark(choosedMark: string): void {
    this.gameSettings.markForFirstPlayer = choosedMark;
  }

  startButtonHandler(): void {
    this._sessionStorageService.gameSettingsSubject = this.gameSettings;
    this._logicService.newGame(this.gameSettings);
    this._router.navigate(['../board'], { relativeTo: this._route });
  }

  ngOnDestroy(): void {
    this.gameSettingsSubscription.unsubscribe();
  }

}
