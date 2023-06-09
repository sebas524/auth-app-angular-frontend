import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthenticationLayoutPageComponent } from './layout/authentication-layout-page/authentication-layout-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    AuthenticationLayoutPageComponent,
  ],
  imports: [CommonModule, AuthenticationRoutingModule, ReactiveFormsModule],
})
export class AuthenticationModule {}
