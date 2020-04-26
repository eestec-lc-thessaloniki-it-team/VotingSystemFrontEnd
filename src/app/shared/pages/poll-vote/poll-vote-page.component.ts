import {Component, OnInit} from '@angular/core';
import {TranslationSection} from '../../models/translations';
import {I18nService} from '../../../core/services/i18n/i18n.service';

@Component({
    selector: 'app-vote-poll',
    templateUrl: './poll-vote-page.component.html',
    styleUrls: ['./poll-vote-page.component.scss']
})
export class PollVotePageComponent implements OnInit {

    pollTranslations: TranslationSection;

    constructor(private i18n: I18nService) {
    }


    ngOnInit(): void {
        this.i18n.getTranslationsSection('poll-vote').then((section) => {
            this.pollTranslations = section;
        });
    }

}
