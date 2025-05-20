import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  const toastr = inject(ToastrService)
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse)=>{
      if(error.status === 401){
        toastr.error(error.error.msg? error.error.msg:'Error comuniquese con un administrador','Error');
        router.navigate(['/login'])
      }
      return throwError(()=> new Error('Error'));
    })
  );
};

// iria esto adentro si no lo hubiera puesto con ssr
// const token = localStorage.getItem('token');
//   if(token){
//     req=req.clone({setHeaders:{Authorization:`Bearer ${token}`}})
//   }
//   return next(req);