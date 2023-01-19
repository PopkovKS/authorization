import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpService } from "../../http.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isSpinning = false
  constructor(
    private httpService: HttpService,
    private router: Router
  ) { }
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onLogin() {
    this.isSpinning = true
    this.httpService.post({
      path: 'auth/login', data: this.loginForm.value
    }).subscribe((resp: any) => {
      localStorage.setItem('access_token', resp.access_token);
      this.isSpinning = false;
      this.router.navigate(['dashboard']);
    })
  }
}
