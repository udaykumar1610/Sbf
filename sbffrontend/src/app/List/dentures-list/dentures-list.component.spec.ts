import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenturesListComponent } from './dentures-list.component';

describe('DenturesListComponent', () => {
  let component: DenturesListComponent;
  let fixture: ComponentFixture<DenturesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenturesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DenturesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
