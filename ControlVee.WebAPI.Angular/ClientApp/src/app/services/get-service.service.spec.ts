import { TestBed } from '@angular/core/testing';

import { BatchService } from './get-service.service';

describe('GetServiceService', () => {
  let service: BatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
