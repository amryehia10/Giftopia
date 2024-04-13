

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, firstValueFrom, map } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { GeneralMethods } from '../../functions';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class DiscoverAllService {
  catNames: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  products:  BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);
  categories:  BehaviorSubject<CategoryModel[]> = new BehaviorSubject<CategoryModel[]>([]);
  discoveredProducts:  BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);
  cartProducts: { productId: string; soldQuantity: number }[] = [];
  constructor(private prdService: ProductService, private catService: CategoryService, private authService: AuthService, private CartService: CartService) { }
  getData():Observable<any>{
    return combineLatest([this.prdService.getAllProducts(), this.catService.getCategory()]).pipe(
      map((data)=>{
        const [products,categories] = data
        this.products.next( GeneralMethods.CastProducts(products)) ;
        this.categories.next( GeneralMethods.CastCategories(categories)); 
        return data
      }),
      map((data)=>{
        this.populatecatNames();
        this.getDiscoveredProducts();
        this.getUsersOldCartProducts();
        return data
      })
    )
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
  
  private populatecatNames(): void {
    for (let cat of this.categories.value) {
      this.catNames.next([...this.catNames.value,cat.name]);
    }
  }

  private getDiscoveredProducts() {
    console.log(this.products,this.categories,this.catNames)

    if (!this.products.value || !this.categories.value || this.catNames.value.length === 0) {
      return;
    }

    this.products.value.sort((a: any, b: any) => {
      const discountA = parseInt(a.discount);
      const discountB = parseInt(b.discount);
      return discountB - discountA;
    });
    
    let counter = 0;
    for (let cat = 0; cat < this.catNames.value.length; cat++) {
      for (let prd of this.products.value) {
        if (this.catNames.value[cat].toLowerCase() == prd.cat[0].toLowerCase() && counter < 8) {
          counter++;
          prd.discount = prd.discount / 100;
          this.discoveredProducts.next([...this.discoveredProducts.value,prd]);
        }
      }
      counter = 0;
    }
  }
}
