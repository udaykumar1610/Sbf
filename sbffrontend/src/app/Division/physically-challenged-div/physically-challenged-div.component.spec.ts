import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicallyChallengedDivComponent } from './physically-challenged-div.component';

describe('PhysicallyChallengedDivComponent', () => {
  let component: PhysicallyChallengedDivComponent;
  let fixture: ComponentFixture<PhysicallyChallengedDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhysicallyChallengedDivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhysicallyChallengedDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
