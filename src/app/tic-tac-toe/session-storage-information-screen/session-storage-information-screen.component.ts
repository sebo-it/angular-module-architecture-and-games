import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-session-storage-information-screen',
  templateUrl: './session-storage-information-screen.component.html',
  styleUrls: ['./session-storage-information-screen.component.css']
})
export class SessionStorageInformationScreenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  reloadPage(): void {
    document.location.reload(true);
  }

}
