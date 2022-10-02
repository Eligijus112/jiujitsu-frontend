import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Form modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

// Http module
import { HttpClientModule } from '@angular/common/http';

// Custom components
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { UserComponent } from './user/user.component';

// Adding the interceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from "./login/login.interceptor";
import { ErrorInterceptor } from './error-interceptor';

// Angular material modules
import { AngularMaterialModule } from './angular-material.module';
import { MatExpansionModule } from "@angular/material/expansion";

// File upload animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,

    // Custom components are imported here
    HeaderComponent,
    SignupComponent,
    HomeComponent,
    LoginComponent,
    MembersComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    //NgFileValidatorLibModule,
    // Custom imports
    AngularMaterialModule,
    MatExpansionModule
  ],
  providers: [
    // Adding the interceptor
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
