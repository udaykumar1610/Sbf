import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelDepartmentDashboardComponent } from './personnel-department-dashboard.component';

describe('PersonnelDepartmentDashboardComponent', () => {
  let component: PersonnelDepartmentDashboardComponent;
  let fixture: ComponentFixture<PersonnelDepartmentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelDepartmentDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonnelDepartmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
