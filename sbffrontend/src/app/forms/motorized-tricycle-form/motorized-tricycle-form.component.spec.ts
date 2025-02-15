import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorizedTricycleFormComponent } from './motorized-tricycle-form.component';

describe('MotorizedTricycleFormComponent', () => {
  let component: MotorizedTricycleFormComponent;
  let fixture: ComponentFixture<MotorizedTricycleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotorizedTricycleFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MotorizedTricycleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
