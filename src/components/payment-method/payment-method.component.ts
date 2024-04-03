import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.css'
})
export class PaymentMethodComponent {
  selectedMethod: string = '';
  price: number = 100;
  shippingCost: number = 50;
  totalPrice: number = this.price + this.shippingCost;
  creditCardNumber: string = "";

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