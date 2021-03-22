import { TestBed } from '@angular/core/testing';

import { FinnCoreService } from '../finn-core.service';

describe('FinnCoreService', () => {
  let service: FinnCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinnCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
