# Observables

An observable in Angular `rxjs` framework is a function that creates an observer and attaches it to the source where values are expected from, for example, clicks, mouse events from a dom element or an Http request, etc. 

An observable gets executed when it is subscribed. An observer is an object with three methods that are notified,

`next()` − This method will send values like a number, string, object etc.

`complete()` − This method will not send any value and indicates the observable as completed.

`error()` − This method will send the error if any.

# Subjects

A subject in RxJS is a special hybrid that can act as both an observable and an observer at the same time. This way, data can be pushed into a subject, and the subject's subscribers will, in turn, receive that pushed data.