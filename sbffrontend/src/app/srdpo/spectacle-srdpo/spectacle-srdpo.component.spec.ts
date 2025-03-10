import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectacleSrdpoComponent } from './spectacle-srdpo.component';

describe('SpectacleSrdpoComponent', () => {
  let component: SpectacleSrdpoComponent;
  let fixture: ComponentFixture<SpectacleSrdpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpectacleSrdpoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpectacleSrdpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
