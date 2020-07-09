import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error: string;
  loading = false;
  submitted = false;
  errorMessage = '';

  username = new FormControl();
  email = new FormControl();
  password = new FormControl();
  password2 = new FormControl();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.loggedIn) {
      this.router.navigate(['home']);
    }
    this.registerForm = this.formBuilder.group(
      {
        username: [this.username, [Validators.required]],
        email: [this.email, [Validators.required]],
        password: [this.password, [Validators.required]],
        // password2: [this.password2, [Validators.required]],
      }
      // { validator: MustMatch("password", "password2") }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    let user = {
      username: this.registerForm.value.username.value,
      password: this.registerForm.value.password.value,
      email: this.registerForm.value.email.value,
    };
    this.userService.register(user).subscribe(
      (res) => {
        console.log(res);
        this.authService
          .login({
            username: user.username,
            password: user.password,
            email: user.email,
          })
          .subscribe(() => {
            this.router.navigate(['home']);
          });
      },
      (error) => {
        this.errorMessage = 'Username is already in use';
      }
    );
  }
}
