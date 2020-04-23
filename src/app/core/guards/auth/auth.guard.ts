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

        if (state.url.startsWith('/dummy')) {
            if (!isAuthenticated) {
                this.router.navigate(['login']);
                return false;
            }
            return true;
        } else if (state.url.startsWith('/login')) {
            if (isAuthenticated) {
                this.router.navigate(['dummy']);
                return false;
            }
            return true;
        }
        return false;
    }

}
