import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenturesFormComponent } from './dentures-form.component';

describe('DenturesFormComponent', () => {
  let component: DenturesFormComponent;
  let fixture: ComponentFixture<DenturesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenturesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DenturesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
