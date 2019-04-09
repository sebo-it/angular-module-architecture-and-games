import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { BoardComponent } from './board/board.component';
import { ResultScreenComponent } from './result-screen/result-screen.component';
import { SettingsScreenComponent } from './settings-screen/settings-screen.component';
import { SessionStorageInformationScreenComponent } from './session-storage-information-screen/session-storage-information-screen.component';
import { SessionStorageGuard } from './session-storage-guard/session-storage.guard';

const ticTacToeRoutes: Routes = [
  { path: '', component: GameComponent, children: [
    { path: '', component: WelcomeScreenComponent },
    { path: 'settings', component: SettingsScreenComponent },
    { path: 'board', component: BoardComponent },
    { path: 'result', component: ResultScreenComponent },
  ], canActivateChild: [SessionStorageGuard]},
  { path: 'notification', component: SessionStorageInformationScreenComponent, canActivate: [SessionStorageGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ticTacToeRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class TicTacToeRoutingModule { }
