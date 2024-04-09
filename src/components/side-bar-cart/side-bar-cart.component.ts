import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

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
export class SideBarCartComponent implements OnInit {
  @Input() isCartSidebarVisible: boolean = false;
  @Output() closeCartSidebar = new EventEmitter<void>();

  cartItems: any[] = [];
  totalPrice: number = 0;

  newCartProducts: {productId: string, soldQuantity: number}[] = [];

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private CartService: CartService, private ProductService: ProductService) { }
  
   async ngOnInit(): Promise<void> {
    const userId = '6613da0131e67deca8b6c269'; 

    try {
      const data = await firstValueFrom(
        this.CartService.getUserCart(userId)
      );
      console.log(data);
      
      this.cartItems = data["data"][0]["products"].map((item: any) => ({
        _id: item._id,
        name: item.name ,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        discount: item.discount,
        soldQuantity: item.soldQuantity
      }));
      this.newCartProducts = data["data"][0]["products"].map((item: any) => ({
        productId: item._id,
        soldQuantity: item.soldQuantity
      }))

      this.totalPrice = data["data"][0]["total"];
      console.log(this.cartItems);
      console.log('total price',this.totalPrice);
      
    } catch (error) {
      console.error('Error fetching user cart:', error);
    }
  }

  
  async removeFromCart(product: ProductModel, $event: any):Promise<void> {
    console.log(product);

    //hide product
    const li = $event.target.closest('li');
    li.style.display = 'none';

    //remove product from cart
    this.newCartProducts = this.newCartProducts.filter(item => item.productId !== product._id);

    let newCart = {
      userId: '6613da0131e67deca8b6c269',
      items: this.newCartProducts
    };

    if(product.quantity > 0) {
      var result = await this.CartService.updateCartProducts(newCart);

      result.forEach((value) => console.log(value));
      console.log('-------------------------------------');
      console.log(newCart);
      
    }else {
      console.log('Product quantity is 0');
    }
  }  

  onCloseCartSidebar() {
    this.closeCartSidebar.emit();

    console.log("onCloseCartSidebar");
  }
}
