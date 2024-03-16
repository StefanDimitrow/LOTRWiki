import { TestBed } from '@angular/core/testing';

import { LotrapiDataserviceService } from './lotrapi-dataservice.service';

describe('LotrapiDataserviceService', () => {
  let service: LotrapiDataserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotrapiDataserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
