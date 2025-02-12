import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisiondashboardComponent } from './divisiondashboard.component';

describe('DivisiondashboardComponent', () => {
  let component: DivisiondashboardComponent;
  let fixture: ComponentFixture<DivisiondashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivisiondashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DivisiondashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
