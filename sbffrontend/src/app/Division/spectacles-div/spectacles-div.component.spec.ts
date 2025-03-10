import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectaclesDivComponent } from './spectacles-div.component';

describe('SpectaclesDivComponent', () => {
  let component: SpectaclesDivComponent;
  let fixture: ComponentFixture<SpectaclesDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpectaclesDivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpectaclesDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
