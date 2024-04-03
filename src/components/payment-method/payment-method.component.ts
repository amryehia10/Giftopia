import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.css'
})
export class PaymentMethodComponent {
  selectedMethod: string = '';
  price: number = 100;
  shippingCost: number = 50;
  totalPrice: number = this.price + this.shippingCost;

  constructor() {}

  selectPaymentMethod(event: any) {
    this.selectedMethod = event.target.value;

    if (this.selectedMethod === 'cashOnDelivery') {
      this.totalPrice = this.price + this.shippingCost + 10;
    } else {
      this.totalPrice = this.price + this.shippingCost;
    }
  }

  get cashOnDelivery(){
    return (this.selectedMethod === 'cashOnDelivery');
  }
}