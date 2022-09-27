# Subscription

In Angular, a subscribe() function is called a subscription. `Subscribe()` is a method in Angular that connects the observer to observable events. Whenever any change is made in these observable, a code is executed and observes the results or changes using the subscribe method. Subscribe() is a method from the rxjs library, used internally by Angular. 

For example, 

``` typescript
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})

export class SubscriptionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const observable = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);
    });

    console.log('just before subscribe');
    observable.subscribe({
      next(x) { console.log('got value ' + x); },
      error(err) { console.error('something wrong occurred: ' + err); },
      complete() { console.log('done'); }
    });
    console.log('just after subscribe');
  }
}
```

The output of the above code is,

``` bash
just before subscribe
got value 1
got value 2
got value 3
just after subscribe
got value 4
done
```

The `subscribe()` method takes three callbacks as arguments. The first callback is called when the observable emits a value. The second callback is called when the observable throws an error. The third callback is called when the observable completes.