import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { GeneralMethods } from '../../functions';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';
import { RelatedProductsComponent } from '../related-products/related-products.component';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { WishListService } from '../../services/wish-list.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProductReviewsComponent,
    RelatedProductsComponent,
  ],
  providers: [ProductService],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product: ProductModel = {
    _id: '',
    desc: '',
    name: '',
    star: 0,
    price: 0,
    quantity: 0,
    discount: 0,
    numberOfSellings: 0,
    numberOfRates: 0,
    cat: [''],
    images: [''],
    createdAt: '',
  };
  filledStarsArray: any;
  emptyStarsArray: any;
  prdID: string = '';
  cartProducts: { productId: string; soldQuantity: number }[] = [];
  wishListItems: any[] = [];

  constructor(private service: ProductService, private route: ActivatedRoute, private CartService: CartService, private authService: AuthService,  private WishListService:WishListService) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.prdID = params.get('id') ?? '';

      this.service.getProductByID(this.prdID).subscribe({
        next: (data) => {
          this.product = GeneralMethods.CastSingleProduct(data);
          this.calculateStarArrays();
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
    this.getUsersOldCartProducts();
    this.getUsersOldWishListProducts();
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

  scrollToReviews() {
    const reviewsSection = document.getElementById('ms-spt-nav-review');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  calculateStarArrays() {
    if (this.product.numberOfRates > 0) {
      const averageRating = this.product.star / this.product.numberOfRates;
      const filledStars = Math.round(averageRating);
      const emptyStars = 5 - filledStars;
  
      this.product.filledStarsArray = Array(Math.max(filledStars, 0)).fill(0);
      this.product.emptyStarsArray = Array(Math.max(emptyStars, 0)).fill(0);
    } else {
      this.product.filledStarsArray = Array(0).fill(0);
      this.product.emptyStarsArray = Array(5).fill(0);
    }
  }
}

// calculateProductRatings() {
//   const { reviews } = this.product;
//   const sumOfStars = reviews.reduce(
//     (sum: number, review: any) => sum + review.stars,
//     0
//   );
//   const averageStars = sumOfStars / reviews.length;
//   this.product.ratings =
//     averageStars >= 0.5 ? Math.ceil(averageStars) : Math.floor(averageStars);
// }
