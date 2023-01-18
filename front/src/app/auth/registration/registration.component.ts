import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { HttpService } from "../../http.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent {
  constructor(private httpService: HttpService) { }
  registrationForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.httpService.post({
      path: 'registration', data: this.registrationForm.value
    }).subscribe(data => {
      console.log(data)
    })
  }
}

