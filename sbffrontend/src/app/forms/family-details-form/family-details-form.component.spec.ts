import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyDetailsFormComponent } from './family-details-form.component';

describe('FamilyDetailsFormComponent', () => {
  let component: FamilyDetailsFormComponent;
  let fixture: ComponentFixture<FamilyDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyDetailsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilyDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
