import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  // !ATTRIBUTES
  private fb = inject(FormBuilder);
  private authenticationService = inject(AuthenticationService);
  // * used for navigation between routes:
  private router = inject(Router);

  // !FORM
  public myForm: FormGroup = this.fb.group({
    email: ['j@gmail.co', [Validators.required, Validators.email], []],
    password: ['123456', [Validators.required, Validators.minLength(6)], []],
  });
  // !CONSTRUCTOR
  // !METHODS
  login() {
    console.log('input values =>', this.myForm.value);
    const { email, password } = this.myForm.value;
    this.authenticationService.login(email, password).subscribe({
      next: () => {
        // * to navigate to dashboard because login credentials where correct:
        this.router.navigateByUrl('/dashboard');
      },
      error: (errMsg) => {
        // * sweet alert for error message in case invalid credentials:
        Swal.fire({
          title: 'Error',
          text: errMsg,
          icon: 'error',
          confirmButtonColor: '#009579',
        });
      },
    });
  }
}
