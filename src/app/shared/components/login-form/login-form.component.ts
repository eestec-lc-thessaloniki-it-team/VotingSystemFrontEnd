import {Component, Input, OnInit} from '@angular/core';
import {TranslationSection} from '../../models/translations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BackendService} from '../../../core/services/auth/backend.service';
import {LoginResponse} from '../../models/LoginResponse';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    @Input()
    translations: TranslationSection;
    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private service: BackendService, private router: Router) {
        this.loginForm = this.formBuilder.group({
            mail: '',
            password: ''
        });
    }

    ngOnInit(): void {
    }

    onSubmit(loginData) {
        this.service.login(loginData).then((response: LoginResponse) => {
            if (response.response === 200) {
                localStorage.setItem('s', response.wrapper.object.session_id);
                this.router.navigate(['dummy']);
            }
        });
    }

}
