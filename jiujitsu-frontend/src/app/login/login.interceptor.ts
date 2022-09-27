// Importing the interceptor
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";

// Importing the auth service
import { LoginService } from "./login.service";

// Injections
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.loginService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
}
