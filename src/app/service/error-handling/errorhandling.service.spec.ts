import { TestBed } from '@angular/core/testing';

import { ErrorHandlerService } from './errorhandling.service';

describe('ErrorhandlingService', () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
