import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeafMentalDivComponent } from './deaf-mental-div.component';

describe('DeafMentalDivComponent', () => {
  let component: DeafMentalDivComponent;
  let fixture: ComponentFixture<DeafMentalDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeafMentalDivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeafMentalDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
