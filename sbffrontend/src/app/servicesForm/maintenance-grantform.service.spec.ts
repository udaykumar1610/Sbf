import { TestBed } from '@angular/core/testing';

import { MaintenanceGrantformService } from './maintenance-grantform.service';

describe('MaintenanceGrantformService', () => {
  let service: MaintenanceGrantformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintenanceGrantformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
