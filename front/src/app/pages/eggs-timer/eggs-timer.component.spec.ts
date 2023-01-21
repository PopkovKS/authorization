import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EggsTimerComponent } from './eggs-timer.component';

describe('EggsTimerComponent', () => {
  let component: EggsTimerComponent;
  let fixture: ComponentFixture<EggsTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EggsTimerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EggsTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
