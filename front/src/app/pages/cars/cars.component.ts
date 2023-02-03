import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpService } from "../../http.service";
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface ICar {
  id: number;
  brand: string;
  model: string;
  color: string;
  mileage: number;
  selected?: boolean;
}

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  skip: any = 0;
  take: any = 2;

  page: any;
  // currentList:any = this.list /this.take ;
  currentPage:any = 1;

  selectedCars = [];
  isCheckedAll = false;
  isVisible = false;
  isUpdate: boolean = false;
  cars: ICar[] = [];
  editCarId: number = 0;
  ids: any;
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

  public delCar(id: number) {
    this.httpService.delete(`cars/delete/${id}`).subscribe((data) => {
      this.notification.success('Car successfully delete', '')
      this.getCars()
    })
  }

  public selectCar(id: any) {
    const car = this.cars.find((car) => id == car.id)
    if (car) {
      car.selected = !car.selected
    }

  }

  public deleteSelected() {
    const ids: any = [];
    this.cars.forEach((car: ICar) => {
      if (car.selected) {
        ids.push(car.id)
      }
    })
    this.httpService.delete(`cars/delete?ids=${JSON.stringify(ids)}`).subscribe((data) => {
      this.notification.success(`${data.count} Cars successfully delete`, '')
      this.getCars()
    })

  }

  public selectAll() {
    this.isCheckedAll = !this.isCheckedAll
    this.cars = this.cars.map((car) => {
      return {...car, selected: this.isCheckedAll}
    })

  }

  public isSelected(): boolean {
    return !!this.cars.find((car: any) => car.selected)
  }


  public showModal(): void {
    this.isUpdate = false;
    this.isVisible = true;
  }

  public showModalUpdate(car: ICar) {
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

  public handleCreate() {
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

  public handleUpdate() {
    this.httpService.put({
      path: `cars/update/${this.editCarId}`, data: this.carForm.value
    }).subscribe(() => {
      this.carForm.reset({brand: ''})
      this.isVisible = false;
      this.notification.success('Car successfully updated', '')
      this.getCars()
    })
  }

  public handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  public backStepList() {
    this.currentPage -= 1
    this.skip = this.skip - this.take
    this.getCars()
  }

  public nextStepList() {
    this.currentPage += 1
    this.skip = this.skip + this.take
    this.getCars()
  }


  ngOnInit() {
    this.getCars()
  }

  getCars() {
    this.httpService.get(`cars?skip=${this.skip}&take=${this.take}`).subscribe((data) => {
      this.cars = data.data
      this.page = Math.floor(data.total / this.take)
    })
  }


  updateCar() {
    this.httpService.put({
      path: 'cars/update', data: this.carForm.value
    }).subscribe((data) => {
      this.getCars()
    })
  }
}






