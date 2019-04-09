import { TestBed, inject } from '@angular/core/testing';

import { WebStorageInformationService } from './web-storage-information.service';

describe('WebStorageInformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebStorageInformationService]
    });
  });

  it('should be created', inject([WebStorageInformationService], (service: WebStorageInformationService) => {
    expect(service).toBeTruthy();
  }));
});
