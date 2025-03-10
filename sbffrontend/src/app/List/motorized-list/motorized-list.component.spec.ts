import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorizedListComponent } from './motorized-list.component';

describe('MotorizedListComponent', () => {
  let component: MotorizedListComponent;
  let fixture: ComponentFixture<MotorizedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotorizedListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MotorizedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
