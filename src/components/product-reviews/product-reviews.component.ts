import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { UserService } from '../../services/user.service';
import { GeneralMethods } from '../../functions';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { apiEndpoint } from '../../config.json';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [ReviewService, UserService],
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.css',
})
export class ProductReviewsComponent implements OnInit {
  apiEndpoint = apiEndpoint;
  reviews: ReviewModel[] = [];
  users: (UserModel | undefined)[] = [];
  userData?: UserModel = {
    _id: '',
    name: '',
    image: '',
    address: [''],
    email: '',
    age: 0,
    password: '',
    phone: [''],
    gender: '',
    userType: '',
  };

  constructor(
    private reviewService: ReviewService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const prdID = String(this.route.snapshot.paramMap.get('id'));
    this.reviewService.getReviewsByProductId(prdID).subscribe({
      next: (data) => {
        this.reviews = GeneralMethods.CastReviews(data);
        if (this.reviews !== undefined) {
          this.reviews.forEach(async (review, index) => {
            this.userService.getUserByID(review.userId).subscribe({
              next: async (data) => {
                this.userData = GeneralMethods.CastUser(data);
                this.users.push(this.userData);
              },
            });
          });
        }
      },
      error: (err) => console.log(err),
    });
  }
}
