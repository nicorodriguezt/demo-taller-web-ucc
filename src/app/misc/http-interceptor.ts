import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, tap, filter } from "rxjs";

export const httpInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    console.log('[LogInterceptor] Request went through interceptor');
    // Here we would typically add auth tokens or custom headers
    // const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    // You should return the new request.
    return next(req).pipe(
        filter(event => event instanceof HttpResponse),
        tap(() => {
            console.log('[LogInterceptor] Response went through interceptor');
        })
    );
};
