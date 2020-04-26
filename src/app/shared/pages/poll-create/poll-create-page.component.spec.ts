import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PollCreatePageComponent} from './poll-create-page.component';

describe('PollComponent', () => {
    let component: PollCreatePageComponent;
    let fixture: ComponentFixture<PollCreatePageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PollCreatePageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PollCreatePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
