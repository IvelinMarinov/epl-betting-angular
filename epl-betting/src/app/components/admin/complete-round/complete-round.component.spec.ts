import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteRoundComponent } from './complete-round.component';

describe('CompleteRoundComponent', () => {
  let component: CompleteRoundComponent;
  let fixture: ComponentFixture<CompleteRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
