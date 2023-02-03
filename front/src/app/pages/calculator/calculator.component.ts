import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {

  a: any;
  b: any;


  result: any;
  symbol:any

  sum(a: any, b: any) {

    switch (this.symbol) {
      case '+':
        this.result = +this.a + +this.b
        console.log(this.result)
        break
      case '-':
        this.result = this.a - this.b
        break
      case '*':
        this.result = this.a * this.b
        break
      case '/':
        this.result = this.a / this.b
        break

    }
    this.result.setValue()
  }
}
