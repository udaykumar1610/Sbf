import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarlistComponent } from './scholarlist.component';

describe('ScholarlistComponent', () => {
  let component: ScholarlistComponent;
  let fixture: ComponentFixture<ScholarlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScholarlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScholarlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
