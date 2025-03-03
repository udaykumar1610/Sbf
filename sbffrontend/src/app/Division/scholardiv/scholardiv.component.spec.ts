import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholardivComponent } from './scholardiv.component';

describe('ScholardivComponent', () => {
  let component: ScholardivComponent;
  let fixture: ComponentFixture<ScholardivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScholardivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScholardivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
