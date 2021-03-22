import { TestBed } from '@angular/core/testing';

import { FinnStoreService } from '../finn-store.service';

describe('FinnStoreService', () => {
  let service: FinnStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinnStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
