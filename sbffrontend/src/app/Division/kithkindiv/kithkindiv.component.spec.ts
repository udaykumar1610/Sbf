import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KithkindivComponent } from './kithkindiv.component';

describe('KithkindivComponent', () => {
  let component: KithkindivComponent;
  let fixture: ComponentFixture<KithkindivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KithkindivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KithkindivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
