import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Home component
import { HomeComponent } from './home/home.component';

// Importing the signup module
import { SignupComponent } from './signup/signup.component';

// Login module
import { LoginComponent } from './login/login.component';

// Members component
import { MembersComponent } from './members/members.component';

// User page
import { UserComponent } from './user/user.component';

const routes: Routes = [
  // Defining the home route
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  // Defining the signup route
  { path: 'signup', component: SignupComponent },
  // Defining the login route
  { path: 'login', component: LoginComponent },
  // Defining the members route
  { path: 'members', component: MembersComponent },
  // Defining the user route
  { path: 'user', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
