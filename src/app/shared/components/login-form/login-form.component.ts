import {Component, Input, OnInit} from '@angular/core';
import {TranslationSection} from '../../models/translations';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
    apiError;
    reason;

    constructor(private formBuilder: FormBuilder, private service: BackendService, private router: Router) {
        this.loginForm = this.formBuilder.group({
            mail: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(6)
            ])
        });
        this.apiError = false;
    }

    ngOnInit(): void {
    }

    onSubmit(loginData) {
        this.service.login(loginData).then((response: LoginResponse) => {
            if (response.response === 200) {
                localStorage.setItem('s', response.wrapper.object.session_id);
                this.router.navigate(['dummy']);
            } else {
                this.apiError = true;
                this.reason = response.msg;
            }
        });
    }

    get mail() {
        return this.loginForm.get('mail');
    }

    get password() {
        return this.loginForm.get('password');
    }

}
