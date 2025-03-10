import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorizedDivComponent } from './motorized-div.component';

describe('MotorizedDivComponent', () => {
  let component: MotorizedDivComponent;
  let fixture: ComponentFixture<MotorizedDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotorizedDivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MotorizedDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
