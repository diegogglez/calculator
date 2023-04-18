import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { OperationsService } from './services/operations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  numbers: any[] = [7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, 'x', 0, '.', '=', '÷' ];
  display: string = '';
  operation: string = '';
  showErr: boolean = false;

  constructor(private operationsService: OperationsService) {}

  ngOnInit() {
    this.clearDisplay();
  }

  clearDisplay() {
    this.display = '0';
  }

  deleteLastDigit() {
    const displayArr = this.display.toString().split('');
    displayArr.pop();
    this.display = displayArr.join('');
  }

  markNumber(num: any) {
    if (num === '=') {
      this.calculate();
    } else if(num === '.' && this.display === '0') {
      this.display = '0.';
    } else if (this.display !== '0') {
      this.display = `${this.display}${num}`;
    } else {
      this.display = `${num}`;
    }
  }

  operationType() {
    const displayArr = this.display.split('');
    displayArr.forEach(item => {
      if (item === '+' || item === '-' || item === '÷' || item === 'x') {
        this.operation = item;
      }
    });
  }

  calculate() {
    this.operationType();
    const displayOperationArr = this.display.split(this.operation);

    if (this.display.includes('+' && '-' || '+' && 'x' || '+' && '÷' || '-' && 'x' || '-' && '÷' || 'x' && '÷')) {
      this.showErr = true;
      this.display = '0';
    } else {
      this.showErr = false;
    }
     
    let result: any;
    
    if(this.operation === '+') {
      result = this.operationsService.sum(Number(displayOperationArr[0]), Number(displayOperationArr[1]));
    } else if (this.operation === '-') {
      result = this.operationsService.subtract(Number(displayOperationArr[0]), Number(displayOperationArr[1]));
    } else if (this.operation === 'x') {
      result = result = this.operationsService.multiply(Number(displayOperationArr[0]), Number(displayOperationArr[1]));
    } else if (this.operation === '÷') {
      result = this.operationsService.divide(Number(displayOperationArr[0]), Number(displayOperationArr[1]));
    }

    this.display = result.toString().includes('.') ? result.toFixed(2) : result;
  }


}
