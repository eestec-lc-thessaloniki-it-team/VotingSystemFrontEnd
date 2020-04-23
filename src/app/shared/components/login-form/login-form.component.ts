import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TranslationSection} from '../../models/translations';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    @Input()
    translations: TranslationSection;

    constructor() {
    }

    ngOnInit(): void {
    }

}
