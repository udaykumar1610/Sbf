import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpodashboardComponent } from './spodashboard.component';

describe('SpodashboardComponent', () => {
  let component: SpodashboardComponent;
  let fixture: ComponentFixture<SpodashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpodashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpodashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
