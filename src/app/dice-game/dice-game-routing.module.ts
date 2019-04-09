import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DiceGameComponent } from './dice-game.component';

const diceGameRoutes: Routes = [
  {path: 'dice-game', component: DiceGameComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(diceGameRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class DiceGameRoutingModule { }
