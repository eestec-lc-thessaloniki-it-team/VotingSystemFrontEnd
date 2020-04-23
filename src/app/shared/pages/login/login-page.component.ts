import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TranslationSection} from '../../models/translations';
import {I18nService} from '../../../core/services/i18n/i18n.service';

@Component({
    selector: 'app-login',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    loginTranslations: TranslationSection;

    constructor(private i18n: I18nService) {
    }

    ngOnInit(): void {
        this.i18n.getTranslationsSection('login').then((section) => {
            this.loginTranslations = section;
        });
    }

}
