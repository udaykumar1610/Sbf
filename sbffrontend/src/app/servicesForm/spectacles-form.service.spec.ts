import { TestBed } from '@angular/core/testing';

import { SpectaclesFormService } from './spectacles-form.service';

describe('SpectaclesFormService', () => {
  let service: SpectaclesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpectaclesFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
