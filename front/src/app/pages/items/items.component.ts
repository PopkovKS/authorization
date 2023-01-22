import { Component } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent {
items = [{
  name: 'susdal`',
  data: {
    temperature: '-10',
    time: new Date()
  }
},
  {
    name: 'kirov',
    data: {
      temperature: '+23',
      time: new Date()
    }
  }]

  selectedItem: any;


  clickItem(item:any) {
    this.selectedItem = item
  }

  clickClose(event:any) {
    this.selectedItem = null
  }




}


