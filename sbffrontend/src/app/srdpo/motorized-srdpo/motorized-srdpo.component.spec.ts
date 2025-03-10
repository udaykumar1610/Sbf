import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorizedSrdpoComponent } from './motorized-srdpo.component';

describe('MotorizedSrdpoComponent', () => {
  let component: MotorizedSrdpoComponent;
  let fixture: ComponentFixture<MotorizedSrdpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotorizedSrdpoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MotorizedSrdpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
