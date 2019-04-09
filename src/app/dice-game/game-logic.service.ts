import { Injectable } from '@angular/core';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {


  players: Player[] = [
    new Player('Player1'),
    new Player('Player2')
  ];

  // private players = new Subject<Player[]>()
  // players$ = this.players.asObservable();

  constructor() { }

  returnPlayers(): Player[]{
    return this.players;
  }

  addValue(player: number, field: string, value: number): void{
    this.players[player][field] = value;
  }

}
