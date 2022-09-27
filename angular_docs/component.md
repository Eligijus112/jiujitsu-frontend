# Components in Angular

The building block of an Angular application is a component. From the official docs: 

`Angular components are a subset of directives, always associated with a template. Unlike other directives, only one component can be instantiated for a given element in a template.

A component must belong to an NgModule in order for it to be available to another component or application.` 

A component is ussualy defined with three files: 

* The component class file, which contains the logic for the component.

* The component template file, which contains the HTML that will be rendered when the component is used.

* The component stylesheet file, which contains the CSS that will be applied to the HTML when the component is used.

For example, a header component dir structure may look like this:

```
header/
├── header.component.css
├── header.component.html
└── header.component.ts
```

# Decorators 

Decorators are design patterns used to isolate the modification or decoration of a class without modifying the source code.

In AngularJS, decorators are functions that allow a service, directive, or filter to be modified before it is used. 

For example, 

``` typescript
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }
}
```

The `Component` is a decorator that changes the way the class `HeaderComponent` is used. It is used to mark a class as an Angular component and provide metadata that determines how the component should be processed, instantiated and used at runtime. 

# Modules 

All the modules need to be registered in the `app.module.ts` file. 

``` typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
```

The `declarations` array contains all the components that are used in the application.

The `imports` array contains all the modules that are used in the application.

The `providers` array contains all the services that are used in the application.

The `bootstrap` array contains the root component of the application.