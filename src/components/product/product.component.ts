import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { GeneralMethods } from '../../functions';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';
import { RelatedProductsComponent } from '../related-products/related-products.component';

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

  constructor(private service: ProductService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.prdID = params.get('id') ?? '';

      this.service.getProductByID(this.prdID).subscribe({
        next: (data) => {
          this.product = GeneralMethods.CastSingleProduct(data);
          this.calculateStarArrays();
          console.log(this.product._id);
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
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
