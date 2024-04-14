import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CartDataService } from '../../services/cart-data.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { GeneralMethods } from '../../functions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [CartService],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.css'
})
export class PaymentMethodComponent implements OnInit, OnDestroy{
  constructor(
    private cartDataService: CartDataService, 
    private orderService: OrderService, 
    private authService: AuthService, 
    private userService: UserService,
    private router: Router
  ) {}

  selectedMethod: string = '';
  price: number = 0;
  shippingCost: number = 30;
  creditCardNumber: string = "";
  totalAmount!: any
  totalPrice!: number;
  cartItems!: any[]
  subscription!: Subscription;
  userChosenAddress: string = '';
  userId = String(this.authService.getCurrentUser()?._id);

  userData: UserModel = {
    _id: '',
    image: '',
    name: '',
    age: 0,
    userType: '',
    gender: '',
    phone: [''],
    password: '',
    address: [''],
    email: '',
  };

  ngOnInit() {
    this.userService.getUserByID(this.userId).subscribe({
      next: (data) => {
        this.userData = GeneralMethods.CastUser(data);
      },
      error: (error) => { 
        console.log(error);
      }
    })    
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

  selectAddress(event:any) {
    this.selectAddress = event.target.value;
  }

  get cashOnDelivery(){
    return (this.selectedMethod === 'cashOnDelivery');
  }

  createOrder() {
    this.orderService.addNewOrder({
      userId: this.userId,
      status: "pending",
      address: this.selectAddress,
      items: this.cartItems,
      paymentMethod: this.selectedMethod
    }).subscribe();
    this.router.navigate(['track-order']);
  }
  
}