import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersBarComponent } from './players-bar.component';

describe('PlayersBarComponent', () => {
  let component: PlayersBarComponent;
  let fixture: ComponentFixture<PlayersBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
