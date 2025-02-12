import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DycpodashboardComponent } from './dycpodashboard.component';

describe('DycpodashboardComponent', () => {
  let component: DycpodashboardComponent;
  let fixture: ComponentFixture<DycpodashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DycpodashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DycpodashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
