import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollVotePageComponent } from './poll-vote-page.component';

describe('VotePollComponent', () => {
  let component: PollVotePageComponent;
  let fixture: ComponentFixture<PollVotePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollVotePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollVotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
