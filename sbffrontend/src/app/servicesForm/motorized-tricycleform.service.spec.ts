import { TestBed } from '@angular/core/testing';

import { MotorizedTricycleformService } from './motorized-tricycleform.service';

describe('MotorizedTricycleformService', () => {
  let service: MotorizedTricycleformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotorizedTricycleformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
