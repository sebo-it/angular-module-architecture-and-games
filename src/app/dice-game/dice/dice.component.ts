import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dice } from '../dice';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {

  @Input() dice: Dice;
  @Output() diceChange = new EventEmitter<Dice>();


  constructor() { }

  ngOnInit() {
  }

  toggleLock(){
    console.log('toggle lock', this.dice);

    this.dice.block = !this.dice.block;
    this.diceChange.emit(this.dice);
  }

}
