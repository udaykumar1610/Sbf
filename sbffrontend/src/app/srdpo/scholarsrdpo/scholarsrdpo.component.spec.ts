import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarsrdpoComponent } from './scholarsrdpo.component';

describe('ScholarsrdpoComponent', () => {
  let component: ScholarsrdpoComponent;
  let fixture: ComponentFixture<ScholarsrdpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScholarsrdpoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScholarsrdpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
