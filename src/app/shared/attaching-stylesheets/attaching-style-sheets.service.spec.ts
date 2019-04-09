import { TestBed, inject } from '@angular/core/testing';

import { AttachingStyleSheetsService } from './attaching-style-sheets.service';

describe('AttachingStyleSheetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttachingStyleSheetsService]
    });
  });

  it('should be created', inject([AttachingStyleSheetsService], (service: AttachingStyleSheetsService) => {
    expect(service).toBeTruthy();
  }));
});
