import { Injectable } from '@angular/core';
import { TicTacToeModule } from './tic-tac-toe.module';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { GameState } from './gameState';
import { GameSettings } from './gameSettings';

@Injectable({
  providedIn: TicTacToeModule
})
export class SessionStorageService {


  private _mySessionStorage = sessionStorage;

  encryptionEnabled: boolean = false;

  private readonly _gameStateStorageFieldName: string = 'gameState';
  private readonly _gameStateStorageFieldNameEncoded: string;
  private _gameStateSubject: BehaviorSubject<GameState>;
  public gameState$: Observable<GameState>;

  private readonly _gameSettingsStorageFieldName: string = 'gameSettings';
  private readonly _gameSettingsStorageFieldNameEncoded: string;
  private _gameSettingsSubject: BehaviorSubject<GameSettings>;
  public gameSettings$: Observable<GameSettings>;

  constructor() {
    let isGameStateInStorage: boolean;
    let isGameSettingsInStorage: boolean;

    if( this.encryptionEnabled ){
      this._gameStateStorageFieldNameEncoded = btoa(this._gameStateStorageFieldName);
      isGameStateInStorage = this._mySessionStorage.getItem(this._gameStateStorageFieldNameEncoded) === null ? false : true;

      this._gameSettingsStorageFieldNameEncoded = btoa(this._gameSettingsStorageFieldName);
      isGameSettingsInStorage = this._mySessionStorage.getItem(this._gameSettingsStorageFieldNameEncoded) === null ? false : true;
    } else {
      isGameStateInStorage = this._mySessionStorage.getItem(this._gameStateStorageFieldName) === null ? false : true;
      isGameSettingsInStorage = this._mySessionStorage.getItem(this._gameSettingsStorageFieldName) === null ? false : true;
    }

    if( isGameStateInStorage ){
      if(this.encryptionEnabled){
        const gameStateFromStorage = this._mySessionStorage.getItem(this._gameStateStorageFieldNameEncoded);
        const decodedGameState = atob(gameStateFromStorage);
        const parsedGameState = JSON.parse(decodedGameState);
        this._gameStateSubject = new BehaviorSubject<GameState>(parsedGameState);
      } else {
        const gameStateFromStorage = this._mySessionStorage.getItem(this._gameStateStorageFieldName);
        const parsedGameState = JSON.parse(gameStateFromStorage);
        this._gameStateSubject = new BehaviorSubject<GameState>(parsedGameState);
      }
    } else {
      this._gameStateSubject = new BehaviorSubject<GameState>(null);
    }

    this.gameState$ = this._gameStateSubject.asObservable();

    if ( isGameSettingsInStorage ) {
      if(this.encryptionEnabled){
        const gameSettingsFromStorageAsString: string = this._mySessionStorage.getItem(this._gameSettingsStorageFieldNameEncoded);
        const decodedGameSettings: string = atob(gameSettingsFromStorageAsString);
        const parsedGameSettings: GameSettings = JSON.parse(decodedGameSettings);
        this._gameSettingsSubject = new BehaviorSubject<GameSettings>(parsedGameSettings);
      } else {
        const gameSettingsFromStorage = this._mySessionStorage.getItem(this._gameSettingsStorageFieldName);
        const parsedGameSettings = JSON.parse(gameSettingsFromStorage);
        this._gameSettingsSubject = new BehaviorSubject<GameSettings>(parsedGameSettings);
      }
    } else {
      this._gameSettingsSubject = new BehaviorSubject<GameSettings>(null);
    }

    this.gameSettings$ = this._gameSettingsSubject.asObservable();

  }

  // =================GameState=================
  get gameStateSubject(): GameState {
    let gameStateAsString;
    if ( this.encryptionEnabled ){
      const gameStateFromStorage = this._mySessionStorage.getItem(this._gameStateStorageFieldNameEncoded);
      gameStateAsString = atob(gameStateFromStorage);

    } else {
      const gameStateFromStorage = this._mySessionStorage.getItem(this._gameStateStorageFieldName);
      gameStateAsString = gameStateFromStorage;
    }
    const parsedGameState = JSON.parse(gameStateAsString);
    return <GameState>parsedGameState;
  }

  set gameStateSubject(newGameState: GameState) {
    if ( this.encryptionEnabled ) {
      const encodedGameState = btoa(JSON.stringify(newGameState));
      this._mySessionStorage.setItem(this._gameStateStorageFieldNameEncoded, encodedGameState);
    } else {
      const stringifiedNewGameState = JSON.stringify(newGameState);
      this._mySessionStorage.setItem(this._gameStateStorageFieldName, stringifiedNewGameState);
    }
    this._gameStateSubject.next(newGameState);
  }

  // public get gameStateSubject$(): Observable<GameState>{
  //   return this._gameStateSubject.asObservable();
  // }

  // Return observable to catch news in subscribers
  public getOneFieldOfStateSubject$<T>(name: string): Observable<T> {
    return this.gameState$.pipe(pluck(name));
  }
  // select<T>(name: string): Observable<T> {
  //   return this.gameState$.pipe(pluck(name));
  // }

  // Return single value
  public getGameStateValue<T>(name: string): T {
    const gameStateValues = this._gameStateSubject.value;
    // console.log('gameStateVaulue', gameStateValues);

    // console.log('session', gameStateValues[name] instanceof Player, typeof gameStateValues[name]);
    return gameStateValues[name];
  }

  // =================GameSettings=================
  get gameSettingsSubject(): GameSettings {
    let gameSettingsAsString: string;
    if (this.encryptionEnabled) {
      const gameSettingsFromStorage = this._mySessionStorage.getItem(this._gameSettingsStorageFieldNameEncoded);
      gameSettingsAsString = atob(gameSettingsFromStorage);
    } else {
      const gameSettingsFromStorage = this._mySessionStorage.getItem(this._gameSettingsStorageFieldName);
      gameSettingsAsString = gameSettingsFromStorage;
    }
    const parsedGameSettings = JSON.parse(gameSettingsAsString);
    return <GameSettings>parsedGameSettings;
  }

  set gameSettingsSubject(newGameSettings: GameSettings) {
    if (this.encryptionEnabled) {
      const encodedGameSettings = btoa(JSON.stringify(newGameSettings));
      this._mySessionStorage.setItem(this._gameSettingsStorageFieldNameEncoded, encodedGameSettings);
    } else {
      const stringifiedGameSettings = JSON.stringify(newGameSettings);
      this._mySessionStorage.setItem(this._gameSettingsStorageFieldName, stringifiedGameSettings);
    }

    this._gameSettingsSubject.next(newGameSettings);
  }

  // public get gameSettingsSubject$(): Observable<GameSettings> {
  //    return this._gameSettingsSubject.asObservable().pipe(distinctUntilChanged());
  // }

  // Return single value
  public getSettingsValue<T>(name: string): T {
    const gameSettingsValues = this._gameSettingsSubject.value;
    return gameSettingsValues[name];
  }

  // =================OTHER=================
  public clearSessionStorageService(): void {
    this._mySessionStorage.clear();
    this._gameStateSubject.next(null);
    this._gameSettingsSubject.next(null);
  }

  public removeSessionStorageItem(name: string): void{
    const itemToRemoveName: string = this.encryptionEnabled ? btoa(name) : name;
    this._mySessionStorage.removeItem(itemToRemoveName);
  }

}
