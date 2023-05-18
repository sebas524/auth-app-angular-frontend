import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AuthStatus } from '../enums/aut-status.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  // * this guard is in charge of protecting the route. so, if authenticated, he lets user in, if not, then not.
  // console.log('isAuthenticated guard =>', { route, state });

  const authService = inject(AuthenticationService);
  const router = inject(Router);

  console.log({ status: authService.authCurrentStatus() });

  if (authService.authCurrentStatus() === AuthStatus.authenticated) {
    return true;
  }

  router.navigateByUrl('/authentication/login');

  return false;
};
