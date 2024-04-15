import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GeneralMethods } from '../../functions';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { WishListService } from '../../services/wish-list.service';

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
  wishListItems: any[] = [];

  constructor(private service: ProductService, private authService: AuthService, private CartService: CartService, private WishListService:WishListService) {}

  ngOnInit(): void {
    this.service.getNewArrivalProducts().subscribe({
      next: (data) => {
        this.Products = GeneralMethods.CastProducts(data);
        this.Products.forEach((product) => this.calculateStarArrays(product));
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.getUsersOldCartProducts();
    this.getUsersOldWishListProducts()
  }

  calculateStarArrays(product: ProductModel) {
    if (product.numberOfRates > 0) {
      const averageRating = product.star / product.numberOfRates;
      const filledStars = Math.round(averageRating);
      const emptyStars = 5 - filledStars;
  
      product.filledStarsArray = Array(Math.max(filledStars, 0)).fill(0);
      product.emptyStarsArray = Array(Math.max(emptyStars, 0)).fill(0);
    } else {
      product.filledStarsArray = Array(0).fill(0);
      product.emptyStarsArray = Array(5).fill(0);
    }
  }
  

  async getUsersOldCartProducts(): Promise<void> {
    const userId = String(this.authService.getCurrentUser()?._id);

    try {
      const data = await firstValueFrom(this.CartService.getUserCart(userId));
      if(data.status != 'failed') {
        this.cartProducts = data['data'][0]['products'].map((item: any) => ({
          productId: item._id,
          soldQuantity: item.soldQuantity,
        }));
      }


      console.log('old', this.cartProducts);
    } catch (error) {
      console.error('Error fetching user cart:', error);
    }
  }

  async getUsersOldWishListProducts(): Promise<void> {
    const userId = String(this.authService.getCurrentUser()?._id);

    try {
      const data = await firstValueFrom(this.WishListService.getUserWishlist(userId));
      if(data.status != 'failed') {
        this.wishListItems = data['data'][0]['products'].map((item: any) => (item._id));
      }
      console.log('old', this.cartProducts);
    } catch (error) {
      console.error('Error fetching user cart:', error);
    }
  }

  async updateWishListProducts(product: ProductModel): Promise<void> {
    this.wishListItems.push(product._id);
    
    console.log(this.wishListItems)

    let newWishList = {
      userId: String(this.authService.getCurrentUser()?._id),
      items: this.wishListItems,
    };

    var result = await this.WishListService.updateWishlist(newWishList);
    console.log(result)
    result.forEach((value) => console.log(value));
    console.log('-------------------------------------');
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
