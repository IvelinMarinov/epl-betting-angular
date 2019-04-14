import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteRoundFormComponent } from './complete-round-form.component';

describe('CompleteRoundFormComponent', () => {
  let component: CompleteRoundFormComponent;
  let fixture: ComponentFixture<CompleteRoundFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteRoundFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteRoundFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
