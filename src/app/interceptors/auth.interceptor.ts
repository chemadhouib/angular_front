import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const auth = inject(AuthService);
  const token = auth.token()
  const loader = inject(LoaderService);
   // Démarrer le spinner
   loader.show();
  if (!token || req.url.includes('register') || req.url.includes('login')) {
    return next(req).pipe(
      finalize(() => loader.hide()) // Stop le spinner
    );
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  })

  const newReq = req.clone({
    headers
  })

  return next(newReq).pipe(
    finalize(() => loader.hide()) // Stop le spinner à la fin
  );
}
