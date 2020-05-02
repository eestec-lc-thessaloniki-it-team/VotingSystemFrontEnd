import {Component, Input, OnInit} from '@angular/core';
import {TranslationSection} from '../../models/translations';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {BackendService} from '../../../core/services/auth/backend.service';
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

    constructor(private formBuilder: FormBuilder, private service: BackendService) {
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
        this.service.createPoll(pollData).then((response: PollCreateResponse) => {
            if (response.response === 200) {
                this.pollCreateForm.reset();
                // this.sharedLink = 'http://localhost:4200/poll/vote?id=' + response.id;  // DEV
                this.sharedLink = 'https://eestec.easyvote.ml/poll/vote?id=' + response.id;  // PROD
            }
        });
    }

    addOption() {
        this.options.push(this.formBuilder.control(''));
    }

    removeOption(index) {
        this.options.removeAt(index);
    }

    copySharedLink() {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.sharedLink;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }

    goToPoll() {
        window.open(this.sharedLink, '_blank');
    }

    get named() {
        return this.pollCreateForm.get('named');
    }

}
