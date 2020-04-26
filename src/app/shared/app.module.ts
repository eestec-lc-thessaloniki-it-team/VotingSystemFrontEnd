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
import {PollCreatePageComponent} from './pages/poll-create/poll-create-page.component';
import {PollVotePageComponent} from './pages/poll-vote/poll-vote-page.component';
import {RegisterPageComponent} from './pages/register/register-page.component';
import {PollResultsPageComponent} from './pages/poll-results/poll-results-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {LogoutComponent} from './pages/logout/logout.component';
import {PollCreateFormComponent} from './components/poll-create-form/poll-create-form.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';

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
        PollResultsPageComponent,
        LogoutComponent,
        PollCreateFormComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        MatTooltipModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
