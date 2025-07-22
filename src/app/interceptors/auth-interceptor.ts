import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authToken = sessionStorage.getItem("auth-token");

  if(authToken){
    const authenticatedRequest = request.clone({
      setHeaders: {
        Authorization: "Bearer " + authToken
      }
    })

    return next(authenticatedRequest);
  }

  return next(request);
};
