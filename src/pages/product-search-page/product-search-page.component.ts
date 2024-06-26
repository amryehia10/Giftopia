import { ActivatedRoute, RouterModule } from '@angular/router';
import { GeneralMethods } from '../../functions';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { WishListService } from '../../services/wish-list.service';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  providers: [ProductService],
  templateUrl: './product-search-page.component.html',
  styleUrl: './product-search-page.component.css',
})
export class ProductSearchPageComponent implements OnInit {
  btnSortToggle = 'Low to High';
  // oldCartProducts = [];
  cartProducts: { productId: string; soldQuantity: number }[] = [];
  wishListItems: any[] = [];
  products: ProductModel[] = [];
  keyword: string = '';

  constructor(
    private router: ActivatedRoute,
    private service: ProductService,
    private CartService: CartService,
    private authService: AuthService,
    private WishListService: WishListService
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.keyword = params.get('keyword') ?? '';
      console.log(this.keyword);

      this.service.getProductsBykeyword(this.keyword).subscribe({
        next: (data) => (this.products = GeneralMethods.CastProducts(data)),
        error: (error) => console.error(error),
      });

      //get old cart products
      this.getUsersOldCartProducts();
      this.getUsersOldWishListProducts();
    });
  }

  toggleSort() {
    if (this.btnSortToggle === 'Low to High') {
      this.products.sort(
        (a, b) =>
          a.price * (1 - a.discount / 100) - b.price * (1 - b.discount / 100)
      );
      this.btnSortToggle = 'High to Low';
    } else {
      this.products.sort(
        (a, b) =>
          b.price * (1 - b.discount / 100) - a.price * (1 - a.discount / 100)
      );
      this.btnSortToggle = 'Low to High';
    }
  }

  async getUsersOldCartProducts(): Promise<void> {
    const userId = String(this.authService.getCurrentUser()?._id);

    try {
      const data = await firstValueFrom(this.CartService.getUserCart(userId));
      if (data.status != 'failed') {
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
      const data = await firstValueFrom(
        this.WishListService.getUserWishlist(userId)
      );
      if (data.status != 'failed') {
        this.wishListItems = data['data'][0]['products'].map(
          (item: any) => item._id
        );
      }
      console.log('old', this.cartProducts);
    } catch (error) {
      console.error('Error fetching user cart:', error);
    }
  }

  async updateWishListProducts(product: ProductModel): Promise<void> {
    this.wishListItems.push(product._id);

    console.log(this.wishListItems);

    let newWishList = {
      userId: String(this.authService.getCurrentUser()?._id),
      items: this.wishListItems,
    };

    var result = await this.WishListService.updateWishlist(newWishList);
    console.log(result);
    result.forEach((value) => console.log(value));
    console.log('-------------------------------------');
  }

  async updateCartProducts(product: ProductModel): Promise<void> {
    const hasProductId = this.cartProducts.findIndex(
      (item) => item.productId === product._id
    );
    let prdQuantity = 0;
    if (hasProductId != -1) {
      prdQuantity = this.cartProducts.find(
        (item) => item.productId === product._id
      )!.soldQuantity;
      this.cartProducts[hasProductId] = {
        productId: product._id,
        soldQuantity: 1 + prdQuantity,
      };
    } else {
      this.cartProducts.push({
        productId: product._id,
        soldQuantity: 1,
      });
    }
    console.log(this.cartProducts);

    let newCart = {
      userId: String(this.authService.getCurrentUser()?._id),
      items: this.cartProducts,
    };

    if (product.quantity > 0) {
      var result = await this.CartService.updateCartProducts(newCart);
      console.log(result);
      result.forEach((value) => console.log(value));
      console.log('-------------------------------------');
      // console.log(newCart);
    } else {
      console.log('Product quantity is 0');
    }
  }
}
