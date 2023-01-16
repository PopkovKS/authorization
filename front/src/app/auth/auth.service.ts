import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // token;

  constructor(private http: HttpClient, private router: Router) {}
  public get token(): string | null {
    return localStorage.getItem('access_token')
  }
  public get logIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }

}
