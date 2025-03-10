import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicallyChallengedSrdpoComponent } from './physically-challenged-srdpo.component';

describe('PhysicallyChallengedSrdpoComponent', () => {
  let component: PhysicallyChallengedSrdpoComponent;
  let fixture: ComponentFixture<PhysicallyChallengedSrdpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhysicallyChallengedSrdpoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhysicallyChallengedSrdpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
