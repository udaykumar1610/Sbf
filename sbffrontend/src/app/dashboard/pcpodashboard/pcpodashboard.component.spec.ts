import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpodashboardComponent } from './pcpodashboard.component';

describe('PcpodashboardComponent', () => {
  let component: PcpodashboardComponent;
  let fixture: ComponentFixture<PcpodashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PcpodashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PcpodashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
