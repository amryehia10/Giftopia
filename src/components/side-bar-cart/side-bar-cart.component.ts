import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { CartDataService } from '../../services/cart-data.service';

@Component({
  selector: 'app-side-bar-cart',
  standalone: true,
  imports: [
    RouterModule,
    CartComponent,
    CheckoutComponent
  ],
  templateUrl: './side-bar-cart.component.html',
  styleUrl: './side-bar-cart.component.css'
})
export class SideBarCartComponent implements OnInit, OnChanges {
  @Input() isCartSidebarVisible: boolean = false;
  @Output() closeCartSidebar = new EventEmitter<void>();

  cartItems: any[] = [];
  totalAmount: number = 0;
  newCartProducts: {productId: string, soldQuantity: number}[] = [];

  constructor(private cartService: CartService, private authService: AuthService, private cartDataService: CartDataService) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isCartSidebarVisible'] && !changes['isCartSidebarVisible'].firstChange) {
      if (this.isCartSidebarVisible) {
        this.loadCart();
      }
    }
  }
  
  ngOnInit(): void {
    if (this.isCartSidebarVisible) {
      this.loadCart();
    }
  }

  async loadCart(): Promise<void> {
    const userId = String(this.authService.getCurrentUser()?._id); 
    try {
      const data = await firstValueFrom(this.cartService.getUserCart(userId));
      if (data.status !== 'failed') {
        this.cartItems = data.data[0].products.map((item: any) => ({
          _id: item._id,
          name: item.name ,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
          discount: item.discount,
          soldQuantity: item.soldQuantity
        }));
        this.newCartProducts = data.data[0].products.map((item: any) => ({
          productId: item._id,
          soldQuantity: item.soldQuantity
        }))
        this.totalAmount = this.cartItems.reduce((total, item) => total + (item.price * item.soldQuantity), 0);
        this.sendTotalAmount(this.totalAmount);
        this.sendcartItems(this.cartItems);
      } 
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
  }

  async removeFromCart(product: any, $event: any): Promise<void> {
    console.log(product);

    //hide product
    const row = $event.target.closest('li');
    row.style.display = 'none';

    //remove product from cart
    this.newCartProducts = this.newCartProducts.filter(item => item.productId !== product._id);

    let newCart = {
      userId: String(this.authService.getCurrentUser()?._id),
      items: this.newCartProducts
    };

    if(product.quantity > 0) {
      var result = await this.cartService.updateCartProducts(newCart);

      result.forEach((value) => console.log(value));
      console.log('-------------------------------------');
      console.log(newCart);

    }else {
      console.log('Product quantity is 0');
    }
  }  

  onCloseCartSidebar(): void {
    this.closeCartSidebar.emit();
    console.log("onCloseCartSidebar");
  }
  
  sendTotalAmount(totalAmount: number) {
    this.cartDataService.setTotalAmount(totalAmount);
  }
  
  sendcartItems(cartItems: any) {
    this.cartDataService.setCartItems(cartItems);
  }

}

