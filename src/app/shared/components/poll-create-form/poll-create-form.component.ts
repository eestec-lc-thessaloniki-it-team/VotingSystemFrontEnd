import {Component, Input, OnInit} from '@angular/core';
import {TranslationSection} from '../../models/translations';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {BackendService} from '../../../core/services/auth/backend.service';
import {Router} from '@angular/router';
import {PollCreateResponse} from '../../models/PollCreateResponse';

@Component({
    selector: 'app-poll-create-form',
    templateUrl: './poll-create-form.component.html',
    styleUrls: ['./poll-create-form.component.scss']
})
export class PollCreateFormComponent implements OnInit {

    @Input()
    translations: TranslationSection;
    pollCreateForm: FormGroup;
    sharedLink: string;

    constructor(private formBuilder: FormBuilder, private service: BackendService, private router: Router) {
        this.pollCreateForm = this.formBuilder.group({
            question: '',
            options_list: this.formBuilder.array([
                this.formBuilder.control(''),
                this.formBuilder.control(''),
                this.formBuilder.control('')
            ]),
            named: false,
            unique: true
        });
    }

    get options() {
        return this.pollCreateForm.get('options_list') as FormArray;
    }

    ngOnInit(): void {
    }

    onSubmit(pollData) {
        pollData.session_id = localStorage.getItem('s');
        console.log(pollData);
        this.service.createPoll(pollData).then((response: PollCreateResponse) => {
            if (response.response === 200) {
                this.pollCreateForm.reset();
                this.sharedLink = 'http://localhost:4200/poll/vote/' + response.id;
            }
        });
    }

    addOption() {
        this.options.push(this.formBuilder.control(''));
    }

    removeOption(index) {
        this.options.removeAt(index);
    }


}