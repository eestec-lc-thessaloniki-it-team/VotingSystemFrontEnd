import {Component, Input, OnInit} from '@angular/core';
import {TranslationSection} from '../../models/translations';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BackendService} from '../../../core/services/auth/backend.service';
import {Router} from '@angular/router';
import {LoginResponse} from '../../models/LoginResponse';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

    @Input()
    translations: TranslationSection;
    registerForm: FormGroup;
    passwordError: string;

    constructor(private formBuilder: FormBuilder, private service: BackendService, public router: Router) {
        this.registerForm = this.formBuilder.group({
            name: new FormControl('', [
                Validators.required
            ]),
            mail: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(6)
            ]),
            passwordRe: new FormControl('', [
                Validators.required,
                Validators.minLength(6)
            ])
        });
    }

    get name() {
        return this.registerForm.get('name');
    }

    get mail() {
        return this.registerForm.get('mail');
    }

    get password() {
        return this.registerForm.get('password');
    }

    get passwordRe() {
        return this.registerForm.get('passwordRe');
    }

    ngOnInit(): void {
    }

    onSubmit(registerData) {
        if (this.registerForm.valid) {
            if (!this.checkPasswords(this.registerForm)) {
                return;
            }
            this.service.register(registerData).then((response: LoginResponse) => {
                if (response.response === 200) {
                    localStorage.setItem('s', response.wrapper.object.session_id);
                    this.router.navigate(['home']);
                }
            });
        }
    }

    checkPasswords(group: FormGroup) {
        const pass = group.get('password').value;
        const confirmPass = group.get('passwordRe').value;

        if (pass !== confirmPass) {
            this.passwordError = 'Passwords given don\'t match.';
            return false;
        }
        this.passwordError = '';
        return true;
    }

}
