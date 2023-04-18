import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor() { }

  sum(a: number, b: number) {
    return a + b;
  }

  subtract(a: number, b: number) {
    return a - b;
  }

  divide(a: number, b: number) {
    return a / b;
  }

  multiply(a: number, b: number) {
    return a * b;
  }
}
