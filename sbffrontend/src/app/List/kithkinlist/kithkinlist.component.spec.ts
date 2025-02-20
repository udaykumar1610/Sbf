import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KithkinlistComponent } from './kithkinlist.component';

describe('KithkinlistComponent', () => {
  let component: KithkinlistComponent;
  let fixture: ComponentFixture<KithkinlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KithkinlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KithkinlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
