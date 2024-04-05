import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartProductService {
  private productIdSource = new BehaviorSubject<string>('');
  productId$ = this.productIdSource.asObservable();
  constructor() { }

  sendProductId(productId: string) {
    this.productIdSource.next(productId);
  }
}
