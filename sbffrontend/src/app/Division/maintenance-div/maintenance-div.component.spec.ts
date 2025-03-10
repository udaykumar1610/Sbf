import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceDivComponent } from './maintenance-div.component';

describe('MaintenanceDivComponent', () => {
  let component: MaintenanceDivComponent;
  let fixture: ComponentFixture<MaintenanceDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceDivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaintenanceDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
