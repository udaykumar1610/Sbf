import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenaceSrdpoComponent } from './maintenace-srdpo.component';

describe('MaintenaceSrdpoComponent', () => {
  let component: MaintenaceSrdpoComponent;
  let fixture: ComponentFixture<MaintenaceSrdpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenaceSrdpoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaintenaceSrdpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
