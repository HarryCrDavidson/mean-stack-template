import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './screens/register/register.component';
import { LoginComponent } from './screens/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './screens/logout/logout.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LogoutComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class UserModule {}
