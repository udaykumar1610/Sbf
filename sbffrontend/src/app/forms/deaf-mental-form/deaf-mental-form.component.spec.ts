import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeafMentalFormComponent } from './deaf-mental-form.component';

describe('DeafMentalFormComponent', () => {
  let component: DeafMentalFormComponent;
  let fixture: ComponentFixture<DeafMentalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeafMentalFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeafMentalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
