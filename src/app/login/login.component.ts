import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm', { static: false }) loginForm!: NgForm;
  isLoading = false;
  error: any = null;
  authObs: any;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin(form: NgForm) {
    console.log(form.value);

    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

    authObs = this.authService.login(email, password);

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.authService.isLogIn.next(true);
        this.router.navigate(['user']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
  }
}
