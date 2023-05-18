import { Component, computed, inject } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css'],
})
export class DashboardLayoutComponent {
  private authService = inject(AuthenticationService);

  public user = computed(() => this.authService.currentUser());

  // * remember this can also be done like this. important thing is to be consistent:
  // get user() {
  //   return this.authService.currentUser();
  // }
}
