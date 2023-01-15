import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../http.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any;
  constructor(
    private httpService: HttpService,
  ) {
  }

  ngOnInit() {
    this.httpService.get('users/profile').subscribe((data) => {
      this.user = data
    })
  }
}
