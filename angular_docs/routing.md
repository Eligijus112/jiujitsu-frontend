# Routing 

Routing is a process where the browser decides which page to display based on the URL. In Angular, routing is handled by the `Router` service. The `Router` service is responsible for mapping URLs to components. 

Typically, the routing is defined in the app-routing.module.ts file. 

``` typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
```

The above example does the following: 

* If the URL is `<host>:<port>` then `HomeComponent` is displayed.

* If the URL is `<host>:<port>/about`, the `AboutComponent` is displayed.

* If the URL is `<host>:<port>/contact`, the `ContactComponent` is displayed.