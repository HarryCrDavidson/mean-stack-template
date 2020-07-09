import { AuthService } from './../../services/auth.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  FormsModule,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  reqUrl: string;
  errorMessage: string;
  loginForm: FormGroup;

  username = new FormControl();
  password = new FormControl();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.loggedIn) {
      this.router.navigate(['home']);
    }
    this.loginForm = this.formBuilder.group({
      username: this.username,
      password: this.password,
    });
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        this.router.navigate(['home']);
        console.log({ message: 'successful login', res: res });
      },
      (error) => {
        this.errorMessage = 'Username or Password is incorrect!';
        console.log({ message: 'failed login', error: error });
      }
    );
  }
}
