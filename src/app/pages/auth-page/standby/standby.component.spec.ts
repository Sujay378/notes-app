import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandbyComponent } from './standby.component';

describe('StandbyComponent', () => {
  let component: StandbyComponent;
  let fixture: ComponentFixture<StandbyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StandbyComponent]
    });
    fixture = TestBed.createComponent(StandbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
