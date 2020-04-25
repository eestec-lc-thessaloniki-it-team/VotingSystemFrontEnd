import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {HomePageComponent} from './pages/home/home-page.component';
import {LoginPageComponent} from './pages/login/login-page.component';
import {DummyLoggedInComponent} from './pages/dummy-logged-in/dummy-logged-in.component';
import {HttpClientModule} from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import { PollCreatePageComponent } from './pages/poll-create/poll-create-page.component';
import { PollVotePageComponent } from './pages/poll-vote/poll-vote-page.component';
import { RegisterPageComponent } from './pages/register/register-page.component';
import { PollResultsPageComponent } from './pages/poll-results/poll-results-page.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginFormComponent,
        HomePageComponent,
        LoginPageComponent,
        DummyLoggedInComponent,
        PollCreatePageComponent,
        PollVotePageComponent,
        RegisterPageComponent,
        PollResultsPageComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
