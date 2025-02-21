import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndigenousSystemComponent } from './indigenous-system.component';

describe('IndigenousSystemComponent', () => {
  let component: IndigenousSystemComponent;
  let fixture: ComponentFixture<IndigenousSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndigenousSystemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndigenousSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
