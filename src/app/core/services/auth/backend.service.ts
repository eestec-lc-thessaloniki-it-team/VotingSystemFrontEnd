import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthResponse} from '../../../shared/models/AuthResponse';
import {LoginResponse} from '../../../shared/models/LoginResponse';
import {PollCreateResponse} from '../../../shared/models/PollCreateResponse';
import {PollGetResponse} from '../../../shared/models/PollGetResponse';
import {VoteCreateResponse} from '../../../shared/models/VoteCreateResponse';

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    // domain = 'http://localhost:5000'; // DEV
    domain = 'https://demo.lilywhitelaundry.gr:5000'; // PROD

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

    register(registerData): Promise<LoginResponse> {
        return this.httpClient.post<LoginResponse>(
            this.domain + '/register', registerData).toPromise();
    }

    createPoll(pollData): Promise<PollCreateResponse> {
        return this.httpClient.post<PollCreateResponse>(
            this.domain + '/create-poll', pollData).toPromise();
    }

    getPoll(id): Promise<PollGetResponse> {
        return this.httpClient.get<PollGetResponse>(
            this.domain + '/poll?id=' + id + '&session_id=' + localStorage.getItem('s')).toPromise();
    }

    results(id, timestamp): Promise<VoteCreateResponse> {
        const body = {
            last_timestamp: timestamp,
            session_id: localStorage.getItem('s')
        };
        return this.httpClient.post<VoteCreateResponse>(
            this.domain + '/results?id=' + id, body).toPromise();
    }

    hasVote(id): Promise<AuthResponse> {
        return this.httpClient.get<AuthResponse>(
            this.domain + '/hasVote?poll_id=' + id + '&session_id=' + localStorage.getItem('s')).toPromise();
    }

    vote(voteObject): Promise<VoteCreateResponse> {
        voteObject.session_id = localStorage.getItem('s');
        return this.httpClient.post<VoteCreateResponse>(
            this.domain + '/vote?id=' + voteObject.id, voteObject).toPromise();
    }

    mvote(voteObject): Promise<VoteCreateResponse> {
        voteObject.session_id = localStorage.getItem('s');
        return this.httpClient.post<VoteCreateResponse>(
            this.domain + '/mvote?id=' + voteObject.id, voteObject).toPromise();
    }

}
