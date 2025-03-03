import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarSPOComponent } from './scholar-spo.component';

describe('ScholarSPOComponent', () => {
  let component: ScholarSPOComponent;
  let fixture: ComponentFixture<ScholarSPOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScholarSPOComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScholarSPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
