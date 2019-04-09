import { Injectable } from '@angular/core';
import { Router, CanActivateChild, CanActivate } from '@angular/router';
import { WebStorageInformationService } from 'src/app/shared/services/web-storage-information.service';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageGuard implements CanActivate, CanActivateChild {

  isSessionStorageOn: boolean;

  constructor(
    private _router: Router,
    private _webStorageInformationService: WebStorageInformationService
  ) {
    this.isSessionStorageOn = this._webStorageInformationService.isSessionStorageOn();
  }

  canActivateChild(): boolean {
    if ( this.isSessionStorageOn ) {
      return true;
    } else {
      this._router.navigate(['/tic-tac-toe/notification']);
      return false;
    }
  }

  canActivate(): boolean {
    if ( this.isSessionStorageOn ) {
      this._router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }

}
