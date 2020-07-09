import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../user/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  searchForm: FormGroup;
  searchDate = new FormControl();
  searchDateEnd = new FormControl();
  searchValue = new FormControl();
  searchOption: string;
  searchInput;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchDate: this.searchDate,
      searchDateEnd: this.searchDateEnd,
      searchValue: this.searchValue,
    });
  }

  searchParams() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
