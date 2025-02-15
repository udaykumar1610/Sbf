import { TestBed } from '@angular/core/testing';

import { DeafMentalFormService } from './deaf-mental-form.service';

describe('DeafMentalFormService', () => {
  let service: DeafMentalFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeafMentalFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
