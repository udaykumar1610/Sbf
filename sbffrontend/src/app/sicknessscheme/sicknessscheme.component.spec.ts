import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SicknessschemeComponent } from './sicknessscheme.component';

describe('SicknessschemeComponent', () => {
  let component: SicknessschemeComponent;
  let fixture: ComponentFixture<SicknessschemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SicknessschemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SicknessschemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
