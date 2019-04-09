import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionStorageInformationScreenComponent } from './session-storage-information-screen.component';

describe('SessionStorageInformationScreenComponent', () => {
  let component: SessionStorageInformationScreenComponent;
  let fixture: ComponentFixture<SessionStorageInformationScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionStorageInformationScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionStorageInformationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
