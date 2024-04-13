import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GeneralMethods } from '../../functions';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-new-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [ProductService],
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.css']
})
export class NewProductsComponent implements OnInit {
  Products: ProductModel[] = [];
  cartProducts: { productId: string; soldQuantity: number }[] = [];

  constructor(private service: ProductService, private authService: AuthService, private CartService: CartService) {}

  ngOnInit(): void {
    this.service.getNewArrivalProducts().subscribe({
      next: (data) => {
        this.Products = GeneralMethods.CastProducts(data);
       
        // if (Array.isArray(data)) {
        //   const twoWeeksAgo = new Date();
        //   twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        //   this.newProducts = data.filter((product: any) => {
        //     return new Date(product.createdAt) >= twoWeeksAgo;
        //   });
        // } else {
        //   console.error('Received data is not an array:', data);
        // }
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.getUsersOldCartProducts();
  }
  async getUsersOldCartProducts(): Promise<void> {
    const userId = String(this.authService.getCurrentUser()?._id);

    try {
      const data = await firstValueFrom(this.CartService.getUserCart(userId));
      if(data.status != 'failed') {
        console.log('hi')
        this.cartProducts = data['data'][0]['products'].map((item: any) => ({
          productId: item._id,
          soldQuantity: item.soldQuantity,
        }));
      } else {
        console.log('fuck')

      }


      console.log('old', this.cartProducts);
    } catch (error) {
      console.error('Error fetching user cart:', error);
    }

    // await this.CartService.getUserCart(userId).subscribe({
    //   next: (response) => {
    //     if (response.status === 'success') {
    //       console.log(response);

    //       this.oldCartProducts = response.data.products;
    //       console.log('old', this.oldCartProducts);

    //     } else {
    //       console.error('Failed to get user cart:', response);
    //     }
    //   },
    //   error: (error) => {
    //     console.error('Error fetching user cart:', error);
    //   }
    // });
  }

  async updateCartProducts(product: ProductModel): Promise<void> {
    const hasProductId = this.cartProducts.findIndex(item => item.productId === product._id);
    let prdQuantity = 0;
    if(hasProductId != -1) {
      prdQuantity = this.cartProducts.find(item => item.productId === product._id)!.soldQuantity;
      this.cartProducts[hasProductId] = {productId: product._id, soldQuantity: 1 + prdQuantity,};
    } else {
      this.cartProducts.push({
        productId: product._id,
        soldQuantity: 1
      });
    }
    console.log(this.cartProducts)

    let newCart = {
      userId: String(this.authService.getCurrentUser()?._id),
      items: this.cartProducts,
    };

    if (product.quantity > 0) {
      var result = await this.CartService.updateCartProducts(newCart);
      console.log(result)
      result.forEach((value) => console.log(value));
      console.log('-------------------------------------');
      // console.log(newCart);
    } else {
      console.log('Product quantity is 0');
    }
  }

}
