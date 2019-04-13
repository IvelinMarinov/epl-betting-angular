import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetStandingsComponent } from './bet-standings.component';

describe('BetStandingsComponent', () => {
  let component: BetStandingsComponent;
  let fixture: ComponentFixture<BetStandingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetStandingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
