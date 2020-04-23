import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DummyLoggedInComponent} from './dummy-logged-in.component';

describe('DummyLoggedInComponent', () => {
    let component: DummyLoggedInComponent;
    let fixture: ComponentFixture<DummyLoggedInComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DummyLoggedInComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DummyLoggedInComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
