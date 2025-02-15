import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectaclesFormComponent } from './spectacles-form.component';

describe('SpectaclesFormComponent', () => {
  let component: SpectaclesFormComponent;
  let fixture: ComponentFixture<SpectaclesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpectaclesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpectaclesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
