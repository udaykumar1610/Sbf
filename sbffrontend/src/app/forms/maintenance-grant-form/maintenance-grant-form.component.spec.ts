import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceGrantFormComponent } from './maintenance-grant-form.component';

describe('MaintenanceGrantFormComponent', () => {
  let component: MaintenanceGrantFormComponent;
  let fixture: ComponentFixture<MaintenanceGrantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceGrantFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaintenanceGrantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
