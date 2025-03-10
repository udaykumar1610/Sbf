import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenturesSrdpoComponent } from './dentures-srdpo.component';

describe('DenturesSrdpoComponent', () => {
  let component: DenturesSrdpoComponent;
  let fixture: ComponentFixture<DenturesSrdpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenturesSrdpoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DenturesSrdpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
