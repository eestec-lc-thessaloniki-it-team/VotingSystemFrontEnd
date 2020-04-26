import {Component, Input, OnInit} from '@angular/core';
import {TranslationSection} from '../../models/translations';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {BackendService} from '../../../core/services/auth/backend.service';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
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

    constructor(private formBuilder: FormBuilder, private service: BackendService, private router: Router) {
        this.registerForm = this.formBuilder.group({
            name: '',
            mail: '',
            password: ['', [Validators.required]],
            passwordRe: ['']
        });
    }

    ngOnInit(): void {
    }

    onSubmit(registerData) {
        if (!this.checkPasswords(this.registerForm)) {
            return;
        }
        this.service.register(registerData).then((response: LoginResponse) => {
            if (response.response === 200) {
                localStorage.setItem('s', response.wrapper.object.session_id);
                this.router.navigate(['dummy']);
            }
        });
    }

    checkPasswords(group: FormGroup) {
        const pass = group.get('password').value;
        const confirmPass = group.get('passwordRe').value;

        return pass === confirmPass;
    }

}
