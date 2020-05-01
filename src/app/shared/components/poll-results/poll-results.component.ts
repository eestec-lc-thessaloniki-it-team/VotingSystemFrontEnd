import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TranslationSection} from '../../models/translations';
import {ActivatedRoute} from '@angular/router';
import {BackendService} from '../../../core/services/auth/backend.service';
import {Votes} from '../../models/votes';

@Component({
    selector: 'app-poll-results-component',
    templateUrl: './poll-results.component.html',
    styleUrls: ['./poll-results.component.scss']
})
export class PollResultsComponent implements OnInit, OnDestroy {

    @Input()
    translations: TranslationSection;
    id: string;
    lastTimestamp: string;
    votes: Votes;
    named: boolean;
    intervalId;

    constructor(private activatedRoute: ActivatedRoute, private service: BackendService) {
        this.getVotingData = this.getVotingData.bind(this);
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.id = params.id;
            this.service.results(this.id, 0).then((response) => {
                if (response.response === 200) {
                    this.lastTimestamp = response.wrapper.lastTimestamp;
                    this.votes = response.wrapper.votes;
                    this.named = response.wrapper.named;
                }
                console.log(this.votes);
                this.intervalId = setInterval(this.getVotingData, 5000);
            });
        });
    }

    getVotingData() {
        this.service.results(this.id, this.lastTimestamp).then((response) => {
            if (response.response === 200) {
                this.lastTimestamp = response.wrapper.lastTimestamp;
                if (this.named) {
                    for (const [key, value] of Object.entries(response.wrapper.votes)) {
                        if (key in this.votes) {
                            // @ts-ignore
                            this.votes[key] = this.votes[key].concat(value);
                        } else {
                            this.votes[key] = value;
                        }
                    }
                } else {
                    for (const [key, value] of Object.entries(response.wrapper.votes)) {
                        if (key in this.votes) {
                            // @ts-ignore
                            this.votes[key] += value;
                        } else {
                            this.votes[key] = value;
                        }
                    }
                }
                console.log(this.votes);
            }
        });
    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
    }

}
