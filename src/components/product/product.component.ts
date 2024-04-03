import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,RouterModule],
  providers: [ProductsService,],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css',]
})
export class ProductComponent implements OnInit {
  product:any;
  filledStarsArray: any;
  emptyStarsArray: any;
  discount:any;

  constructor(private productService: ProductsService,
    private route: ActivatedRoute) {
    
  }
  ngOnInit(): void {
    const prdID = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ngOnInit called')
    this.productService.getSingleProduct(prdID).subscribe({
      next: (data) => {
        this.product = data;
        this.calculateProductRatings();
        this.calculateStarArrays();
        this.discount = parseInt(this.product["discount"]) / 100;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  calculateProductRatings() {
    const { reviews } = this.product;
    const sumOfStars = reviews.reduce((sum: number, review: any) => sum + review.stars, 0);
    const averageStars = sumOfStars / reviews.length;
    this.product.ratings = averageStars >= 0.5 ? Math.ceil(averageStars) : Math.floor(averageStars);
  }

  calculateStarArrays() {
    const filledStars = Math.floor(this.product.ratings);
    const emptyStars = 5 - filledStars;

    this.filledStarsArray = Array(filledStars).fill(0);
    this.emptyStarsArray = Array(emptyStars).fill(0);
  }

  scrollToReviews() {
    const reviewsSection = document.getElementById('ms-spt-nav-review');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}