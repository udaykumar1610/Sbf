import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationschemeComponent } from './educationscheme.component';

describe('EducationschemeComponent', () => {
  let component: EducationschemeComponent;
  let fixture: ComponentFixture<EducationschemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationschemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EducationschemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
