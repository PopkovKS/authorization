import { Component } from '@angular/core';
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent {
  constructor(private authService: AuthService) {
  }
  isCollapsed = false;

  logout() {
    this.authService.logout()
  }
}
