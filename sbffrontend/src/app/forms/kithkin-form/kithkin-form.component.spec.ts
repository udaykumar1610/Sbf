import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KithkinFormComponent } from './kithkin-form.component';

describe('KithkinFormComponent', () => {
  let component: KithkinFormComponent;
  let fixture: ComponentFixture<KithkinFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KithkinFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KithkinFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
