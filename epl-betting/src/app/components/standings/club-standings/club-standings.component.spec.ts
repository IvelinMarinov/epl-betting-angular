import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubStandingsComponent } from './club-standings.component';

describe('ClubStandingsComponent', () => {
  let component: ClubStandingsComponent;
  let fixture: ComponentFixture<ClubStandingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubStandingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
