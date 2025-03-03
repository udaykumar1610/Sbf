import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarPCPOComponent } from './scholar-pcpo.component';

describe('ScholarPCPOComponent', () => {
  let component: ScholarPCPOComponent;
  let fixture: ComponentFixture<ScholarPCPOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScholarPCPOComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScholarPCPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
