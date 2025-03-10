import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalDevComponent } from './medical-dev.component';

describe('MedicalDevComponent', () => {
  let component: MedicalDevComponent;
  let fixture: ComponentFixture<MedicalDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalDevComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicalDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
