import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalSrdpoComponent } from './medical-srdpo.component';

describe('MedicalSrdpoComponent', () => {
  let component: MedicalSrdpoComponent;
  let fixture: ComponentFixture<MedicalSrdpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalSrdpoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicalSrdpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
