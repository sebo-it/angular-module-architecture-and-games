import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../session-storage.service';
import { fade } from 'src/app/animations/fade';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css'],
  animations: [fade]
})
export class WelcomeScreenComponent implements OnInit {

  constructor(private _sessionStorage: SessionStorageService) { }

  ngOnInit() {
    this._sessionStorage.clearSessionStorageService();
  }

}
