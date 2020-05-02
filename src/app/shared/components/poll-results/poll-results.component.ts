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
    question: string;
    options: string[];
    data: DataRow[];
    selectedOption: string;

    constructor(private activatedRoute: ActivatedRoute, private service: BackendService) {
        this.getVotingData = this.getVotingData.bind(this);
        this.sliceClick = this.sliceClick.bind(this);
    }

    get optionsLength() {
        // @ts-ignore
        return this.votes[this.selectedOption].length;
    }

    ngOnInit() {
        this.data = [];
        this.activatedRoute.queryParams.subscribe(params => {
            this.id = params.id;

            this.service.getPoll(this.id).then((resp) => {
                this.question = resp.wrapper.object.question;
                this.options = resp.wrapper.object.options;
                this.service.results(this.id, 0).then((response) => {
                    if (response.response === 200) {
                        this.lastTimestamp = response.wrapper.lastTimestamp;
                        this.votes = response.wrapper.votes;
                        this.named = response.wrapper.named;
                    }
                    this.populateData();
                    this.intervalId = setInterval(this.getVotingData, 5000);
                });
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
                this.populateData();
            }
        });
    }

    populateData() {
        this.data = [];

        for (const [key, value] of Object.entries(this.votes)) {
            // @ts-ignore
            const votesCount = (this.named) ? value.length : value;
            this.data.push({
                option: this.options[key] + ' (' + votesCount + ')',
                // @ts-ignore
                votes: votesCount,
                index: key
            });
        }
    }

    sliceClick(event) {
        const selectedIndex = event.args._implementation._slice._dataContext.index;
        if (this.selectedOption !== selectedIndex) {
            this.selectedOption = selectedIndex;
        } else {
            this.selectedOption = null;
        }
        console.log(this.selectedOption);
    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
    }

}


export interface DataRow {
    option: string;
    vote: number;
}
