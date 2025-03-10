import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicallchallengedListComponent } from './physicallchallenged-list.component';

describe('PhysicallchallengedListComponent', () => {
  let component: PhysicallchallengedListComponent;
  let fixture: ComponentFixture<PhysicallchallengedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhysicallchallengedListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhysicallchallengedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
