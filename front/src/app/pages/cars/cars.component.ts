import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpService } from "../../http.service";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  isVisible = false;
  cars:any = [];
  brands = [
    'subaru','bmw','opel'
  ]
  carForm = new FormGroup({
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    mileage: new FormControl(0, Validators.required)
  })

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.getCars()
  }
  getCars() {
    this.httpService.get('cars').subscribe((data) => {
      this.cars = data
    })
  }
  delCar(id: number) {
    this.httpService.delete(`cars/delete/${id}`).subscribe((data) => {
      this.getCars()
    })
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.httpService.post({
      path: 'cars/create', data: this.carForm.value
    }).subscribe((data) => {
      this.isVisible = false;
      this.getCars()
    })
    console.log('Button ok clicked!');
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
