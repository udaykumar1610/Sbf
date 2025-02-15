import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicallyChallengedFormComponent } from './physically-challenged-form.component';

describe('PhysicallyChallengedFormComponent', () => {
  let component: PhysicallyChallengedFormComponent;
  let fixture: ComponentFixture<PhysicallyChallengedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhysicallyChallengedFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhysicallyChallengedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
