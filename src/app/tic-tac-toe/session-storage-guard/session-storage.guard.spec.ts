import { TestBed, async, inject } from '@angular/core/testing';

import { SessionStorageGuard } from './session-storage.guard';

describe('SessionStorageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionStorageGuard]
    });
  });

  it('should ...', inject([SessionStorageGuard], (guard: SessionStorageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
