import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './pages/home/home-page.component';
import {LoginPageComponent} from './pages/login/login-page.component';
import {DummyLoggedInComponent} from './pages/dummy-logged-in/dummy-logged-in.component';
import {AuthGuard} from '../core/guards/auth/auth.guard';
import {RegisterPageComponent} from './pages/register/register-page.component';
import {PollCreatePageComponent} from './pages/poll-create/poll-create-page.component';
import {PollResultsPageComponent} from './pages/poll-results/poll-results-page.component';
import {PollVotePageComponent} from './pages/poll-vote/poll-vote-page.component';


const routes: Routes = [
    {path: '', component: HomePageComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginPageComponent, canActivate: [AuthGuard]},
    {path: 'logout', component: LoginPageComponent, canActivate: [AuthGuard]},
    {path: 'register', component: RegisterPageComponent, canActivate: [AuthGuard]},
    {
        path: 'poll', canActivate: [AuthGuard], children: [
            {
                path: 'create',
                component: PollCreatePageComponent
            },
            {
                path: 'results',
                component: PollResultsPageComponent
            },
            {
                path: 'vote',
                component: PollVotePageComponent
            }
        ]
    },
    {path: 'home', component: DummyLoggedInComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
