import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  // !ATTRIBUTES
  private fb = inject(FormBuilder);
  private authenticationService = inject(AuthenticationService);

  // !FORM
  public myForm: FormGroup = this.fb.group({
    name: ['mike', [Validators.required, Validators.minLength(1)], []],
    email: ['mike@gmail.com', [Validators.required, Validators.email], []],
    password: ['123456', [Validators.required, Validators.minLength(6)], []],
  });

  register() {
    console.log('input values =>', this.myForm.value);
    const { name, email, password } = this.myForm.value;

    this.authenticationService.register(name, email, password).subscribe({
      next: () => {
        // * to navigate to dashboard because login credentials where correct:

        // * sweet alert for error message in case invalid credentials:
        Swal.fire({
          title: 'Account Created!',
          text: 'Congratulations, you habe created an account with us, please login with your new credentials!',
          icon: 'success',
          confirmButtonColor: '#009579',
        });
        // // * to navigate to dashboard because login credentials where correct:
        //       this.router.navigateByUrl('/dashboard');
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
