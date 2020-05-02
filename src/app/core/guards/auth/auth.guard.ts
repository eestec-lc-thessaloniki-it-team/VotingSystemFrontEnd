import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {BackendService} from '../../services/auth/backend.service';
import {AuthResponse} from '../../../shared/models/AuthResponse';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(public auth: BackendService, public router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.auth.isAuthenticated().then((result: AuthResponse) => {
            const isAuthenticated: boolean = result.isValid;

            switch (state.url.indexOf('?') !== -1 ? state.url.substring(0, state.url.indexOf('?')) : state.url) {
                case '/':
                    return this.handleHomePage(isAuthenticated);
                case '/login':
                case '/register':
                    return this.handleLoginAndRegister(isAuthenticated);
                case '/home':
                case '/poll/create':
                case '/poll/results':
                case '/poll/vote':
                    return this.handleProtectedPage(isAuthenticated);
                case '/logout':
                    return this.handleLogout();
            }
            return false;
        });
    }

    private handleLogout(): boolean {
        localStorage.clear();
        this.router.navigate(['login']);
        return false;
    }

    private handleHomePage(isAuthenticated: boolean): boolean {
        if (isAuthenticated) {
            this.router.navigate(['home']);
        } else {
            this.router.navigate(['login']);
        }
        return false;
    }

    private handleProtectedPage(isAuthenticated: boolean): boolean {
        if (!isAuthenticated) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

    private handleLoginAndRegister(isAuthenticated: boolean): boolean {
        if (isAuthenticated) {
            this.router.navigate(['home']);
            return false;
        }
        return true;
    }

}
