import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() total: any;
  @Input() itemPerPage: any;
  @Input() currentPage: number = 1;
  @Output() onPagination = new EventEmitter<number>()


  countPage: any;
  pages: any;


  constructor() {

  }

  ngOnInit() {
    this.init()
  }

  init() {
    this.pages = []
    this.countPage = Math.ceil(this.total / this.itemPerPage)
    for (let i = 1; i <= this.countPage; i++) {
      this.pages.push(i)
    }
  }

  ngOnChanges() {
    this.init()
  }


  public backStepPage() {
    this.currentPage -= 1
    this.onPagination.emit(this.currentPage)
  }

  public nextStepPage() {
    this.currentPage += 1
    this.onPagination.emit(this.currentPage)
  }

  public changePage(page: any) {
    this.currentPage = page
    this.onPagination.emit(page)
  }

  public nextStepEnd() {
    this.currentPage = this.countPage
    this.onPagination.emit(this.currentPage)
  }

  public backStepStart() {
    this.currentPage = 1
    this.onPagination.emit(this.currentPage)
  }
}
