import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceBetsFormComponent } from './place-bets-form.component';

describe('PlaceBetsFormComponent', () => {
  let component: PlaceBetsFormComponent;
  let fixture: ComponentFixture<PlaceBetsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceBetsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceBetsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
