import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { GeneralMethods } from '../../functions';
import { catchError, combineLatest, map } from 'rxjs';
import { DiscoverAllService } from './discover-all.service';
import { CartProductService } from '../../services/cart-product.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { WishListService } from '../../services/wish-list.service';

@Component({
  selector: 'app-discover-all',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [ProductService, CategoryService,HttpClientModule],
  templateUrl: './discover-all.component.html',
  styleUrl: './discover-all.component.css'
})

export class DiscoverAllComponent {  
  constructor(public service:DiscoverAllService, private cartProductService: CartProductService, private authService: AuthService, private CartService: CartService, private WishListService: WishListService){}
  
  public get categories(){
    return this.service.categories.value 
  }
  
  public get discoveredProducts() {
    return this.service.discoveredProducts.value
  }

  public get cartProducts() {
    return this.service.cartProducts;
  }

  public get wishListItems() {
    return this.service.wishListItems;
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

  addToCart(prdId: string) {
    this.cartProductService.sendProductId(prdId);
  }
}