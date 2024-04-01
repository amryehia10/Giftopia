import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css',]
})
export class ProductComponent {
  product = {
    name: 'Crunchy Potato Chips',
    description: 'any text',
    price: 120,
    quantity: 100,
    category: 'Accessories',
    discount: 0,
    images: [
      { url: 'https://miro.medium.com/v2/resize:fit:1400/1*5um9WLqV5UHYt4I0JQfqRA.jpeg' },
      { url: 'https://jerrysantiquesandestates.com/wp-content/uploads/2023/07/The-History-and-Significance-of-Antiques_-What-Makes-Them-Valuable.jpg' },
    ],
    reviews: [
      { userid: 'user123', stars: 3, reviewDescription: 'Great taste!' },
      { userid: 'user456', stars: 2, reviewDescription: 'Ya3 taste!' },
      { userid: 'user789', stars: 5, reviewDescription: 'GOAT taste!' },
    ],
    ratings: 0, // initialize ratings property
  };

  filledStarsArray: any;
  emptyStarsArray: any;

  constructor() {
    this.calculateProductRatings();
    this.calculateStarArrays();
  }

  calculateProductRatings() {
    const { reviews } = this.product;
    const sumOfStars = reviews.reduce((sum, review) => sum + review.stars, 0);
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
