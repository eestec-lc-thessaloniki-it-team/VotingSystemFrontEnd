import {Component, OnInit} from '@angular/core';
import {TranslationSection} from '../../models/translations';
import {I18nService} from '../../../core/services/i18n/i18n.service';

@Component({
    selector: 'app-dummy-logged-in',
    templateUrl: './dummy-logged-in.component.html',
    styleUrls: ['./dummy-logged-in.component.scss']
})
export class DummyLoggedInComponent implements OnInit {

    homeTranslations: TranslationSection;

    constructor(private i18n: I18nService) {
    }

    ngOnInit(): void {
        this.i18n.getTranslationsSection('home').then((section) => {
            this.homeTranslations = section;
        });
    }

}
