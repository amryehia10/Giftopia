import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { CartService } from '../../services/cart.service';
import { GeneralMethods } from '../../functions';
import { CartProductService } from '../../services/cart-product.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    RouterModule,
    HomeComponent,
    PrivacyPolicyComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent /*implements OnInit */{
  cartItems: any[] = [];
  cartProducts: ProductModel[] = [];

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private CartService: CartService, private ProductService: ProductService) { }

  // ngOnInit(): void {
  //   this.CartService.getAllAtCartByUserId('user123').subscribe({
  //     // next: (data) => console.log(data),
  //     next: (data) => this.cartItems = GeneralMethods.CastCartItems(data),
  //     error: (error) => console.error(error)
  //   });
  // }
  ngOnInit(): void {
    this.CartService.getAllAtCartByUserId('660c71754ae7f2f3338cca19').subscribe({
      next: (data) => {
        this.cartItems = data["data"].map((item: any) => ({
          userId: item.userId,
          productId: item.productId,
          quantity: item.quantity,
          total: item.total
        }));

        console.log(this.cartItems);
      },
      error: (error) => console.error(error)
    });

    this.getAllproductsInCart();
  }

  currentProduct:any;
  getAllproductsInCart() {
    for (const element of this.cartItems) {
      for (const productId of element.productId) {
        this.getProductById(productId);
        this.cartProducts.push(this.currentProduct);
      }
      console.log(this.cartProducts);
    }
  } 


  getProductById(Pid: any){
    this.ProductService.getProductByID(Pid).subscribe({
      next: (data) => {
        this.currentProduct= GeneralMethods.CastProduct(data)
      },
      error: (error) => console.error(error)
    })
  }


  removeFromCart(item: any) {
    
  }  

  navigateToHome() {
    this.router.navigate(['home']);
  }

}
