import {Component, OnInit} from '@angular/core';
import {TranslationSection} from '../../models/translations';
import {I18nService} from '../../../core/services/i18n/i18n.service';

@Component({
    selector: 'app-poll',
    templateUrl: './poll-create-page.component.html',
    styleUrls: ['./poll-create-page.component.scss']
})
export class PollCreatePageComponent implements OnInit {

    pollTranslations: TranslationSection;

    constructor(private i18n: I18nService) {
    }


    ngOnInit(): void {
        this.i18n.getTranslationsSection('poll-create').then((section) => {
            this.pollTranslations = section;
        });
    }

}
