import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicTacToeRoutingModule } from './tic-tac-toe-routing.module';
import { GameComponent } from './game.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { BoardComponent } from './board/board.component';
import { LogicService } from './logic.service';
import { ResultScreenComponent } from './result-screen/result-screen.component';
import { PlayersBarComponent } from './players-bar/players-bar.component';
import { ShowPossibleMarkOnHoverDirective } from './showPossibleMarkOnHoverDirective/show-possible-mark-on-hover.directive';
import { SessionStorageService } from './session-storage.service';
import { SettingsScreenComponent } from './settings-screen/settings-screen.component';
import { InfoBoxComponent } from './info-box/info-box.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { AttachingStyleSheetsService } from '../shared/attaching-stylesheets/attaching-style-sheets.service';
import { SessionStorageInformationScreenComponent } from './session-storage-information-screen/session-storage-information-screen.component';
import { SessionStorageGuard } from './session-storage-guard/session-storage.guard';

@NgModule({
  imports: [
    CommonModule,
    TicTacToeRoutingModule
  ],
  declarations: [
    GameComponent,
    WelcomeScreenComponent,
    BoardComponent,
    PlayersBarComponent,
    ResultScreenComponent,
    ShowPossibleMarkOnHoverDirective,
    SettingsScreenComponent,
    InfoBoxComponent,
    InstructionsComponent,
    SessionStorageInformationScreenComponent
  ],
  providers: [
    LogicService,
    SessionStorageGuard,
    SessionStorageService
  ]
})
export class TicTacToeModule {

  constructor(private _attachingStyleSheetsService: AttachingStyleSheetsService) {
    this._attachingStyleSheetsService.attachStyleSheet('assets/module-range-stylesheets/tic-tac-toe.css');
  }

}
