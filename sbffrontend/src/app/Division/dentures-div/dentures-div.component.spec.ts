import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenturesDivComponent } from './dentures-div.component';

describe('DenturesDivComponent', () => {
  let component: DenturesDivComponent;
  let fixture: ComponentFixture<DenturesDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenturesDivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DenturesDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
