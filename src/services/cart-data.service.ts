import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {

  constructor() { }

  private totalAmount = new BehaviorSubject<number>(0);
  private cartItems = new BehaviorSubject<any[]>([]);

  setTotalAmount(update: number) {
    this.totalAmount.next(update);
  }

  getTotalAmount() { 
    return this.totalAmount;
  }

  setCartItems(data: any[]) {
    this.cartItems.next(data);
  }

  getcartItems() { 
    return this.cartItems;
  }
}
