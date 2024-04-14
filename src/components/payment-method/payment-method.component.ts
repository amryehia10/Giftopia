import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartDataService } from '../../services/cart-data.service';
@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [CartService],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.css'
})
export class PaymentMethodComponent implements OnInit, OnDestroy{
  selectedMethod: string = '';
  price: number = 0;
  shippingCost: number = 30;
  creditCardNumber: string = "";
  totalAmount!: any
  totalPrice!: number;
  cartItems!: any[]
  subscription!: Subscription;

  constructor(private cartDataService: CartDataService) {}
  ngOnInit() {
    this.subscription = this.cartDataService.getTotalAmount().subscribe(value => {
      this.totalAmount = value;
    });

    this.subscription = this.cartDataService.getcartItems().subscribe(value => {
      this.cartItems = value;
      console.log( this.cartItems);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  calculatePrice(products: any[]): number {
    let price = 0;
    products.forEach(product => {
      price += (product.price - product.discount) * product.quantity;
    });
    return price;
  }
  

  selectPaymentMethod(event: any) {
    this.selectedMethod = event.target.value;
    if (this.selectedMethod === 'cashOnDelivery') {
      this.totalPrice = this.totalAmount + this.shippingCost  + 10;
    } else {
      this.totalPrice = this.totalAmount + this.shippingCost;
    }
  }

  get cashOnDelivery(){
    return (this.selectedMethod === 'cashOnDelivery');
  }
}