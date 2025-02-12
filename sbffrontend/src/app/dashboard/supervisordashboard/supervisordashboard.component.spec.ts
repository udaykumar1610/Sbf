import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisordashboardComponent } from './supervisordashboard.component';

describe('SupervisordashboardComponent', () => {
  let component: SupervisordashboardComponent;
  let fixture: ComponentFixture<SupervisordashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupervisordashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupervisordashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
