import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshHandlerComponent } from './refresh-handler.component';

describe('RefreshHandlerComponent', () => {
  let component: RefreshHandlerComponent;
  let fixture: ComponentFixture<RefreshHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefreshHandlerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefreshHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
