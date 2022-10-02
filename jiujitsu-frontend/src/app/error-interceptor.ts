// Importing the interceptor
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { catchError, throwError } from "rxjs";

// Modals
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An unknown error occurred!";
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'An error occured',
          text: errorMessage
        })
        return throwError(error);
      })
    );
  }
}
