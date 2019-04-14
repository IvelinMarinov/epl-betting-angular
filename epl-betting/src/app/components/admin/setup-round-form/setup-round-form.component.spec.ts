import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupRoundFormComponent } from './setup-round-form.component';

describe('SetupRoundFormComponent', () => {
  let component: SetupRoundFormComponent;
  let fixture: ComponentFixture<SetupRoundFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupRoundFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupRoundFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
