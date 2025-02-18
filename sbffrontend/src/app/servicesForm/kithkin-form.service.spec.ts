import { TestBed } from '@angular/core/testing';

import { KithkinFormService } from './kithkin-form.service';

describe('KithkinFormService', () => {
  let service: KithkinFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KithkinFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
