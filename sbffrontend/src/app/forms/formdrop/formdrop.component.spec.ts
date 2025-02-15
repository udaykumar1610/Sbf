import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdropComponent } from './formdrop.component';

describe('FormdropComponent', () => {
  let component: FormdropComponent;
  let fixture: ComponentFixture<FormdropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormdropComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
