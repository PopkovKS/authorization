import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uri = 'http://localhost:3000/';
  // token;

  constructor(private http: HttpClient, private router: Router) {}
  public get token(): string | null {
    return localStorage.getItem('access_token')
  }
  public get logIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  login(email: any, password: any) {
    this.http.post(this.uri + 'auth/login', {email: email, password: password})
      .subscribe((resp: any) => {

        localStorage.setItem('access_token', resp.access_token);
        this.router.navigate(['dashboard']);

      })
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }

}
