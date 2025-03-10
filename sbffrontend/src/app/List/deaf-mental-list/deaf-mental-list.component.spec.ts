import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeafMentalListComponent } from './deaf-mental-list.component';

describe('DeafMentalListComponent', () => {
  let component: DeafMentalListComponent;
  let fixture: ComponentFixture<DeafMentalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeafMentalListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeafMentalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
