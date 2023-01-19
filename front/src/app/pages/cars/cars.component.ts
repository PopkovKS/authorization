import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpService } from "../../http.service";
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  isVisible = false;
  isUpdate: boolean = false;
  cars: any = [];
  editCarId: number = 0;
  brands = [
    'subaru', 'bmw', 'opel', 'honda'
  ]
  carForm = new FormGroup({
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    mileage: new FormControl(0, Validators.required)
  })

  constructor(
    private httpService: HttpService,
    private notification: NzNotificationService
  ) {
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
      this.notification.success('Car successfully delete','')
      this.getCars()
    })
  }

  updateCar() {
    this.httpService.put({
      path: 'cars/update', data: this.carForm.value
    }).subscribe((data) => {
      this.getCars()
    })
  }


  showModal(): void {
    this.isUpdate = false;
    this.isVisible = true;
  }

  showModalUpdate(car: { id: number, brand: string, model: string, color: string, mileage: number }) {
    console.log(car)
    this.editCarId = car.id;
    this.isUpdate = true;
    this.isVisible = true;
    this.carForm.patchValue({
      brand: car.brand,
      model: car.model,
      color: car.color,
      mileage: car.mileage,
    })
  }

  handleCreate() {
    this.httpService.post({
      path: 'cars/create', data: this.carForm.value
    }).subscribe((data) => {
      this.isVisible = false;
      this.notification.create('success', 'Car successfully created', '')
      this.carForm.reset({brand: ''})
      this.getCars()
    })
    console.log('Button ok clicked!');
  }

  handleUpdate() {
    this.httpService.put({
      path: `cars/update/${this.editCarId}`, data: this.carForm.value
    }).subscribe(() => {
      this.carForm.reset({brand: ''})
      this.isVisible = false;
      this.notification.success('Car successfully updated','')
      this.getCars()
    })
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
