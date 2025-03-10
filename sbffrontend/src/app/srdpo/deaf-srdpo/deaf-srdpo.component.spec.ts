import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeafSrdpoComponent } from './deaf-srdpo.component';

describe('DeafSrdpoComponent', () => {
  let component: DeafSrdpoComponent;
  let fixture: ComponentFixture<DeafSrdpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeafSrdpoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeafSrdpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
