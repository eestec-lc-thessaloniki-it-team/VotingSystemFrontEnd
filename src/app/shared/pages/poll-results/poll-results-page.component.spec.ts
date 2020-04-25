import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollResultsPageComponent } from './poll-results-page.component';

describe('PollResultsComponent', () => {
  let component: PollResultsPageComponent;
  let fixture: ComponentFixture<PollResultsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollResultsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollResultsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
