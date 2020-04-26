import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthResponse} from '../../../shared/models/AuthResponse';
import {LoginResponse} from '../../../shared/models/LoginResponse';
import {PollCreateResponse} from '../../../shared/models/PollCreateResponse';

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    domain = 'http://localhost:5000';

    constructor(private httpClient: HttpClient) {
    }

    isAuthenticated(): Promise<AuthResponse> {
        return this.httpClient.get<AuthResponse>(
            this.domain + '/isValid-session?session_id=' + localStorage.getItem('s')).toPromise();
    }

    login(loginData): Promise<LoginResponse> {
        return this.httpClient.post<LoginResponse>(
            this.domain + '/login', loginData).toPromise();
    }

    createPoll(pollData): Promise<PollCreateResponse> {
        return this.httpClient.post<PollCreateResponse>(
            this.domain + '/create-poll', pollData).toPromise();
    }

}
