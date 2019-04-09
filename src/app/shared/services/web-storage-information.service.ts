import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebStorageInformationService {

  constructor() { }

  public isSessionStorageOn(): boolean {

    try {
      if(window.sessionStorage){
        console.log('sessionStorage on');
        return true;
      }
    } catch(error) {
      console.log('sessionStorage off');
      return false;
    }

  }
}
