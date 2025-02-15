import { TestBed } from '@angular/core/testing';

import { DenturesService } from './dentures.service';

describe('DenturesService', () => {
  let service: DenturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DenturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
