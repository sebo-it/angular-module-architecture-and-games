import { Directive, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';
import { SessionStorageService } from '../session-storage.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appShowPossibleMarkOnHover]'
})
export class ShowPossibleMarkOnHoverDirective implements OnInit, OnDestroy {

  markToDisplay: string = '';
  currentElement;
  gameStateSubscription: Subscription;

  constructor(
    private _element: ElementRef,
    private _sessionStorageService: SessionStorageService
  ){}

  ngOnInit(): void {
    this.gameStateSubscription = this._sessionStorageService.gameState$.subscribe( (receivedGameState)=>{
      this.markToDisplay = receivedGameState.turnOfPlayer;
    });
  }

  @HostListener('mouseenter') onMouseEnter() {
    if ( this._element.nativeElement.textContent === '' ) {
      this.currentElement = this._element.nativeElement;
      this._element.nativeElement.style.color = 'rgba(00,27,74,0.5)';
      this._element.nativeElement.textContent = this.markToDisplay;
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if ( this._element.nativeElement === this.currentElement ) {
      // reset color below, avoid transition problem
      // when mouse enter <td> again
      this._element.nativeElement.style.color = 'rgba(00,27,74,0.0)';
      this._element.nativeElement.textContent = '';
    }
  }

  // Remove textContent to avoid display problem in Google Chrome which
  // shows mark in the next column through 1 sec.
  @HostListener('click') onMouseClick() {
    if ( this._element.nativeElement === this.currentElement ) {
      this._element.nativeElement.textContent = '';
    }
  }

  ngOnDestroy(): void {
    this.gameStateSubscription.unsubscribe();
  }

}
