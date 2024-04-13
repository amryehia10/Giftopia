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

  constructor(private service: ProductService, private route: ActivatedRoute, private CartService: CartService, private authService: AuthService) {}
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

  scrollToReviews() {
    const reviewsSection = document.getElementById('ms-spt-nav-review');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  calculateStarArrays() {
    const filledStars = Math.floor(this.product.star);
    const emptyStars = 5 - filledStars;

    this.filledStarsArray = Array(filledStars).fill(0);
    this.emptyStarsArray = Array(emptyStars).fill(0);
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
