import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './pages/home/home-page.component';
import {LoginPageComponent} from './pages/login/login-page.component';
import {DummyLoggedInComponent} from './pages/dummy-logged-in/dummy-logged-in.component';
import {AuthGuard} from '../core/guards/auth/auth.guard';


const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'login', component: LoginPageComponent, canActivate: [AuthGuard]},
    {path: 'dummy', component: DummyLoggedInComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
