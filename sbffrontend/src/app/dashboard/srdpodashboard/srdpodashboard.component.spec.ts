import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrdpodashboardComponent } from './srdpodashboard.component';

describe('SrdpodashboardComponent', () => {
  let component: SrdpodashboardComponent;
  let fixture: ComponentFixture<SrdpodashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SrdpodashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SrdpodashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
