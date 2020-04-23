import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../../../shared/models/login-request';
import {LoginResponse} from '../../../shared/models/login-response';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient) {
    }

    login(loginRequest: LoginRequest): Observable<LoginResponse> {
        return null;
    }

    isAuthenticated(): boolean {
        return false;
    }

}
