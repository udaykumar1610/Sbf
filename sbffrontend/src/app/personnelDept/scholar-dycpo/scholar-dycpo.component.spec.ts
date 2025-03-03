import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarDYCPOComponent } from './scholar-dycpo.component';

describe('ScholarDYCPOComponent', () => {
  let component: ScholarDYCPOComponent;
  let fixture: ComponentFixture<ScholarDYCPOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScholarDYCPOComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScholarDYCPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
