import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkilldevelopmentschemeComponent } from './skilldevelopmentscheme.component';

describe('SkilldevelopmentschemeComponent', () => {
  let component: SkilldevelopmentschemeComponent;
  let fixture: ComponentFixture<SkilldevelopmentschemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkilldevelopmentschemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkilldevelopmentschemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
