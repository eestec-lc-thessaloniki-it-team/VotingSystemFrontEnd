import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(public auth: AuthService, public router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isAuthenticated: boolean = this.auth.isAuthenticated();

        switch (state.url.indexOf('?') !== -1 ? state.url.substring(0, state.url.indexOf('?')) : state.url) {
            case '/':
                return this.handleHomePage(isAuthenticated);
            case '/login':
            case '/register':
                return this.handleLoginAndRegister(isAuthenticated);
            case '/dummy':
            case '/poll':
            case '/results':
            case '/vote':
                return this.handleProtectedPage(isAuthenticated);
        }
        return false;
    }

    private handleHomePage(isAuthenticated: boolean): boolean {
        if (isAuthenticated) {
            this.router.navigate(['dummy']);
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
            this.router.navigate(['dummy']);
            return false;
        }
        return true;
    }

}
