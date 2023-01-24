import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {


  @Input() item: any
  @Output() onClose = new EventEmitter<any>()
  close() {
    this.onClose.emit()
  }
}
