import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ValidatorService } from '../../services/validator.service';

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
  private validatorService = inject(ValidatorService);

  // !FORM
  public myForm: FormGroup = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorService.emailPattern),
      ],
      [],
    ],
    password: ['', [Validators.required, Validators.minLength(6)], []],
  });
  // !CONSTRUCTOR
  // !METHODS
  isFieldValid(field: string) {
    return this.validatorService.isFieldValid(this.myForm, field);
  }

  login() {
    console.log('input values =>', this.myForm.value);

    const { email, password } = this.myForm.value;
    return this.authenticationService.login(email, password).subscribe({
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
