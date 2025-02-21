import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecreationAmusementComponent } from './recreation-amusement.component';

describe('RecreationAmusementComponent', () => {
  let component: RecreationAmusementComponent;
  let fixture: ComponentFixture<RecreationAmusementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecreationAmusementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecreationAmusementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
