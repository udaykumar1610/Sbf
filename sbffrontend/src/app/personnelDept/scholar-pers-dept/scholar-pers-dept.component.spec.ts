import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarPersDeptComponent } from './scholar-pers-dept.component';

describe('ScholarPersDeptComponent', () => {
  let component: ScholarPersDeptComponent;
  let fixture: ComponentFixture<ScholarPersDeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScholarPersDeptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScholarPersDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
