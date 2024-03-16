import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealmsComponent } from './realms.component';

describe('RealmsComponent', () => {
  let component: RealmsComponent;
  let fixture: ComponentFixture<RealmsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RealmsComponent]
    });
    fixture = TestBed.createComponent(RealmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
