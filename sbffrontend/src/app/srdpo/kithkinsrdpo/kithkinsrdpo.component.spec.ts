import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KithkinsrdpoComponent } from './kithkinsrdpo.component';

describe('KithkinsrdpoComponent', () => {
  let component: KithkinsrdpoComponent;
  let fixture: ComponentFixture<KithkinsrdpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KithkinsrdpoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KithkinsrdpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
