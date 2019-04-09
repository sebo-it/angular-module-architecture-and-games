import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttachingStyleSheetsService {

  constructor() { }

  public attachStyleSheet(href: string): void {
    const linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('href', href);
    document.head.appendChild(linkElement);
  }

}
