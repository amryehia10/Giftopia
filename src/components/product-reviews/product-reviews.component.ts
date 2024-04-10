import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { UserService } from '../../services/user.service';
import { GeneralMethods } from '../../functions';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { apiEndpoint } from '../../config.json';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
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
  prdID: string = '';
  userRate = 4;
  userComment = '';
  curruntUser: any;

  constructor(
    private reviewService: ReviewService,
    private userService: UserService,
    private route: ActivatedRoute,
    private authServies: AuthService,
    private router: Router
  ) {
    this.curruntUser = authServies.getCurrentUser();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.prdID = params.get('id') ?? '';
      this.reviewService.getReviewsByProductId(this.prdID).subscribe({
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
    });
  }

  setUserRate(rate: number) {
    this.userRate = rate;
  }

  addReview() {
    if (!this.curruntUser) {
      this.router.navigate(['/']);
    }
    this.reviewService
      .addNewReview({
        userId: this.curruntUser._id,
        productId: this.prdID,
        comment: this.userComment,
        rate: this.userRate,
      })
      .subscribe({
        next: (data: any) => {
          if (data['status'] == 'success')
            this.reviews.push(data['review'] as ReviewModel);
          this.userService.getUserByID(this.curruntUser._id).subscribe({
            next: async (data) => {
              this.userData = GeneralMethods.CastUser(data);
              this.users.push(this.userData);
            },
          });
        },
      });
  }
}

/*
  userId: { type: "string" },
  productId: { type: "string" },
  comment: { type: "string" },
  rate: { type: "number" }
*/
