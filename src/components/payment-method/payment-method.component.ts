import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [CartService],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.css'
})
export class PaymentMethodComponent implements OnInit {
  selectedMethod: string = '';
  price: number = 0;
  shippingCost: number = 50;
  totalPrice: number = this.price + this.shippingCost;
  creditCardNumber: string = "";

  constructor(private cartService: CartService) {}

  ngOnInit() {
    const userId = '6613da0131e67deca8b6c269';

    this.cartService.getUserCart(userId).subscribe((cartData: any) => {
      this.price = this.calculatePrice(cartData.data[0].products);
      // console.log('CART PRODUCTS', cartData.data[0].products);
      // console.log("THE PRICE: ", this.price);
    });
  }

  calculatePrice(products: any[]): number {
    let price = 0;
    products.forEach(product => {
      price += (product.price - product.discount) * product.quantity;
      // console.log(product);
      // console.log(price);
    });
    return price;
  }
  

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