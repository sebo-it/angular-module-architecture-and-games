import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiceGameComponent } from './dice-game.component';
import { DiceGameRoutingModule } from './/dice-game-routing.module';
import { DiceComponent } from './dice/dice.component';

@NgModule({
  imports: [
    CommonModule,
    DiceGameRoutingModule
  ],
  declarations: [DiceGameComponent, DiceComponent]
})
export class DiceGameModule { }
