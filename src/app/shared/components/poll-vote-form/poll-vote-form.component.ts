import {Component, Input, OnInit} from '@angular/core';
import {TranslationSection} from '../../models/translations';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendService} from '../../../core/services/auth/backend.service';
import {PollGetResponse} from '../../models/PollGetResponse';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
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
    }

    buildOptions() {
        const options: FormControl[] = [];
        this.poll.wrapper.object.options.forEach((option) => {
            options.push(this.formBuilder.control(false));
        });
        this.pollVoteForm = this.formBuilder.group({
            chosen_option: this.formBuilder.array(options),
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
                            this.buildOptions();
                        }
                    });
                } else {
                    this.router.navigate(['/poll/results'], {
                        queryParams: {
                            id: this.id
                        }
                    });
                }
            });
        });
    }

    onSubmit() {
        const voteData = {
            id: this.id,
            chosen_option: (this.poll.wrapper.object.unique) ? this.selected : this.getOptions()
        };

        let promise: Promise<VoteCreateResponse>;

        if (this.poll.wrapper.object.unique) {
            promise = this.service.vote(voteData);
        } else {
            promise = this.service.mvote(voteData);
        }

        promise.then((response: VoteCreateResponse) => {
            this.router.navigate(['/poll/results'], {
                queryParams: {
                    id: this.id
                }
            });
        });
    }

    getOptions() {
        const options = [];
        this.chosenOption.value.forEach((item, index) => {
            if (item) {
                options.push(index);
            }
        });
        return options;
    }

    change(index) {
        this.selected = index;
    }

    get chosenOption() {
        return this.pollVoteForm.get('chosen_option') as FormArray;
    }

}
