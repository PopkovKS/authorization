import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { HttpService } from "../http.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any;
  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.httpService.get('profile').subscribe((data) => {
      this.user = data
    })
  }

  logout() {
    this.authService.logout()
  }

}
