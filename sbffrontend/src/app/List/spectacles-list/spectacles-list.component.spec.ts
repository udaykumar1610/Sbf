import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectaclesListComponent } from './spectacles-list.component';

describe('SpectaclesListComponent', () => {
  let component: SpectaclesListComponent;
  let fixture: ComponentFixture<SpectaclesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpectaclesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpectaclesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
