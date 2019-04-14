import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupRoundComponent } from './setup-round.component';

describe('SetupRoundComponent', () => {
  let component: SetupRoundComponent;
  let fixture: ComponentFixture<SetupRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
