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

@NgModule({
    declarations: [
        AppComponent,
        LoginFormComponent,
        HomePageComponent,
        LoginPageComponent,
        DummyLoggedInComponent
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
