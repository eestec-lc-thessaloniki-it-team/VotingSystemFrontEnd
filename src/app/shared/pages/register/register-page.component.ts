import {Component, OnInit} from '@angular/core';
import {TranslationSection} from '../../models/translations';
import {I18nService} from '../../../core/services/i18n/i18n.service';

@Component({
    selector: 'app-register',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

    registerTranslations: TranslationSection;

    constructor(private i18n: I18nService) {
    }

    ngOnInit(): void {
        this.i18n.getTranslationsSection('register').then((section) => {
            this.registerTranslations = section;
        });
    }

}
