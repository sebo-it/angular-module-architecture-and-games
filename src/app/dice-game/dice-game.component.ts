import { Component, OnInit } from '@angular/core';
import { GameLogicService } from './game-logic.service';
import { Player } from './player';
import { Result } from './result';
import { Dice } from './dice';

@Component({
  selector: 'app-dice-game',
  templateUrl: './dice-game.component.html',
  styleUrls: ['./dice-game.component.css']
})
export class DiceGameComponent implements OnInit {

  players: Player[];
  possibleResults: Result[] = [
    new Result(),
    new Result()
  ];

  turnOfPlayer: number = 0;

  round: number = 1;

  dices: Dice[] = [
    new Dice(),
    new Dice(),
    new Dice(),
    new Dice(),
    new Dice()
  ];

  availableThrows = 3;

  constructor(private _gameLogicService: GameLogicService) {}

  ngOnInit() {
    this.players = this._gameLogicService.returnPlayers();
    this.throwDice();
  }

  throwDice() {
    for (let i = 0; i < 5; i++) {
      const currentDice = this.dices[i];
      if (!currentDice.block) {
        const randomNumber = Math.floor(Math.random() * 6 + 1);
        currentDice.value = randomNumber;
      }
    }
    this.availableThrows--;
    this.assignPossibility();
  }

  assignPossibility() {
    let currentPosibility: Result =  new Result();

    const numbersQuantity = this.getNumbersQuantity();
    console.log('assignPossibility', numbersQuantity);
    currentPosibility = this.analyzePossibility(numbersQuantity);
  }

  getNumbersQuantity(): {} {
    console.log(this.dices);
    const numbersQuantity = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0
    }
    this.dices.forEach(dice => {
      const currentValue = dice.value;
      numbersQuantity[currentValue]++;
    });

    return numbersQuantity;
  }

  analyzePossibility( numbersQuantity: {} ): Result {
    const possibleResult =  this.possibleResults[this.turnOfPlayer];
    possibleResult.ones = numbersQuantity['1'];
    possibleResult.twos = numbersQuantity['2'];
    possibleResult.threes = numbersQuantity['3'];
    possibleResult.foures = numbersQuantity['4'];
    possibleResult.fives = numbersQuantity['5'];
    possibleResult.sixes = numbersQuantity['6'];

    this.possibleResults[this.turnOfPlayer] = possibleResult;

    return possibleResult;
  }

  chooseField( field: string, valueToAssign : number){

    this.players[this.turnOfPlayer][field] = valueToAssign;

    if( this.round === 26 ){
    } else {
      this.turnOfPlayer = ++this.turnOfPlayer % this.players.length;
      this.round++;
      this.unlockAllDices();
      this.availableThrows = 3;
      this.throwDice();
    }
  }

  unlockAllDices(){
    this.dices.forEach(dice => {
      dice.block = false;
    });
  }

}
