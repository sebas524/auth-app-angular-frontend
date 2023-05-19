import { Component, computed, effect, inject } from '@angular/core';
import { AuthenticationService } from './authentication/services/authentication.service';
import { AuthStatus } from './authentication/enums/aut-status.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private authService = inject(AuthenticationService);
  private router = inject(Router);

  public isAuthCheckCompleted = computed<boolean>(() => {
    if (this.authService.authCurrentStatus() === AuthStatus.checking) {
      return false;
    }
    return true;
  });

  public authStatusChangedEffect = effect(() => {
    // * effect will trigger once when loaded, and then everytime a signal in the effect changes

    switch (this.authService.authCurrentStatus()) {
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return;
      case AuthStatus.notAunthenticated:
        this.router.navigateByUrl('/auth/login');
        return;
    }
  });
}
