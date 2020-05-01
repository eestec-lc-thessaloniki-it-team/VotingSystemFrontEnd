import {Component, OnInit} from '@angular/core';
import {TranslationSection} from '../../models/translations';
import {I18nService} from '../../../core/services/i18n/i18n.service';

@Component({
    selector: 'app-poll-results',
    templateUrl: './poll-results-page.component.html',
    styleUrls: ['./poll-results-page.component.scss']
})
export class PollResultsPageComponent implements OnInit {

    pollTranslations: TranslationSection;

    constructor(private i18n: I18nService) {
    }


    ngOnInit(): void {
        this.i18n.getTranslationsSection('poll-results').then((section) => {
            this.pollTranslations = section;
        });
    }

}
