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

  sort: any;
  filterByBrand: any = '';
  filters:any = {}

  total: number = 0;
  skip: any = 0;
  take: any = 2;
  currentPage: any = 1;

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

  ngOnInit() {
    this.init()
  }

  init() {
    this.getCars()
  }

  public delCar(id: number) {

    this.httpService.delete(`cars/delete/${id}`).subscribe((data) => {
      this.notification.success('Car successfully delete', '')

      if ((this.total - 1) % this.take === 0 && this.total != 1) {
        this.skip = this.skip - this.take
        this.currentPage--
      }
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
      if ((this.total - ids.length) % this.take === 0 && this.total != ids.length) {
        this.skip = this.skip - this.take
        this.currentPage--
      }
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
      if (this.total % this.take === 0 && this.total != 0) {
        this.currentPage++
        this.skip = this.skip + this.take
      }
      this.getCars()
    })
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
    this.isVisible = false;
  }


  public filterBrand() {
    if (this.filterByBrand) {
      this.filters.brand = this.filterByBrand
      this.skip = 0
      this.getCars()
    }
  }

  public clearFilters() {
    this.skip = 0
    this.filters = {}
    this.filterByBrand = ''
    this.getCars()
  }

  public changePage(currentPage: any) {
    this.currentPage = currentPage
    this.skip = currentPage * this.take - this.take
    this.getCars()
  }

  public getCars() {
    let url = `cars?skip=${this.skip}&take=${this.take}`

    for (let filterKey in this.filters) {
      if(this.filters.hasOwnProperty(filterKey)) {
        url += `&${filterKey}=${this.filters[filterKey]}`
      }
    }
    // if (this.sort) {
    //   url += `&orderBy= ${this.sort}`a
    // }
    this.httpService.get(url)
      .subscribe((cars) => {
        this.cars = cars.data
        this.total = cars.total
      })
  }

}
