import { TestBed } from '@angular/core/testing';

import { FactsDatabaseService } from './facts-database.service';

describe('FactsDatabaseService', () => {
  let service: FactsDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactsDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
