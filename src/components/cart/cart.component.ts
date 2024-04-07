import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { CartService } from '../../services/cart.service';
import { GeneralMethods } from '../../functions';
import { CartProductService } from '../../services/cart-product.service';
import { ProductService } from '../../services/product.service';
import { firstValueFrom } from 'rxjs';

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

export class CartComponent implements OnInit {
  cartItems: any[] = [];
  cartProducts: ProductModel[] = [];

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private CartService: CartService, private ProductService: ProductService) { }
  
  async ngOnInit(): Promise<void> {
    try {
      const data = await firstValueFrom(
        this.CartService.getAllAtCartByUserId('660c71754ae7f2f3338cca19')
      );
      this.cartItems = data["data"].map((item: any) => ({
        userId: item.userId,
        productId: item.productId,
        quantity: item.quantity,
        total: item.total,
      }));

      await this.getAllproductsInCart();
      console.log(this.cartProducts);
    } catch (error) {
      console.error(error);
    }
  }

  async getAllproductsInCart(): Promise<void> {
    for (const element of this.cartItems) {
      for (const productId of element.productId) {
        await this.getProductById(productId);
      }
    }
  }

  async getProductById(Pid: any): Promise<void> {
    try {
      const data = await firstValueFrom(this.ProductService.getProductByID(Pid));
      const currentProduct = GeneralMethods.CastSingleProduct(data);
      this.cartProducts.push(currentProduct);
    } catch (error) {
      console.error(error);
    }
  }

  removeFromCart(item: any) {
    
  }  

  navigateToHome() {
    this.router.navigate(['home']);
  }

}
