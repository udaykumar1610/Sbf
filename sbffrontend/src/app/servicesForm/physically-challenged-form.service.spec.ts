import { TestBed } from '@angular/core/testing';

import { PhysicallyChallengedFormService } from './physically-challenged-form.service';

describe('PhysicallyChallengedFormService', () => {
  let service: PhysicallyChallengedFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhysicallyChallengedFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
