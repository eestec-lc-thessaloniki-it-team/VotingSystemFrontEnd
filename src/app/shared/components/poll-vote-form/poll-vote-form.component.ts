import {Component, Input, OnInit} from '@angular/core';
import {TranslationSection} from '../../models/translations';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendService} from '../../../core/services/auth/backend.service';
import {PollGetResponse} from '../../models/PollGetResponse';
import {FormBuilder, FormGroup} from '@angular/forms';
import {VoteCreateResponse} from '../../models/VoteCreateResponse';

@Component({
    selector: 'app-poll-vote-form',
    templateUrl: './poll-vote-form.component.html',
    styleUrls: ['./poll-vote-form.component.scss']
})
export class PollVoteFormComponent implements OnInit {

    @Input()
    translations: TranslationSection;
    pollVoteForm: FormGroup;
    id: string;
    poll: PollGetResponse;
    selected: number;

    constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
                private service: BackendService, private router: Router) {
        this.pollVoteForm = this.formBuilder.group({
            chosen_option: ''
        });
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.id = params.id;
            this.service.hasVote(this.id).then((resp) => {
                if (resp.isValid) {
                    this.service.getPoll(this.id).then((response) => {
                        if (response.response === 200) {
                            this.poll = response;
                        }
                    });
                } else {
                    this.router.navigate(['/poll/results']);
                }
            });
        });
    }

    onSubmit() {
        const voteData = {
            id: this.id,
            chosen_option: this.selected
        };
        this.service.vote(voteData).then((response: VoteCreateResponse) => {
            this.router.navigate(['/poll/results']);
        });
    }

    change(index) {
        this.selected = index;
    }

}
