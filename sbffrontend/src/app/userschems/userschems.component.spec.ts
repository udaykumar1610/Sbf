import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserschemsComponent } from './userschems.component';

describe('UserschemsComponent', () => {
  let component: UserschemsComponent;
  let fixture: ComponentFixture<UserschemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserschemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserschemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
