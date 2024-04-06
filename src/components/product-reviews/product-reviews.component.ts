import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { UserService } from '../../services/user.service';
import { GeneralMethods } from '../../functions';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [CommonModule],
  providers: [ReviewService,UserService],
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.css'
})
export class ProductReviewsComponent implements OnInit{
  @Input('productId') productId = '';
  reviews: ReviewModel[] = [];
  users: UserModel[] = [];
  
  constructor(private reviewService: ReviewService, private  userService: UserService) {}
  
  ngOnInit(): void {
    // console.log(this.productId);
    // this.reviewService.getReviewsByProductId(this.productId).subscribe({
    //   next: async (data)=>{
    //     console.log(data);
    //     this.reviews= await GeneralMethods.CastReviews(data);
    //     console.log(this.reviews);
    //   },
    //   error: (err) => console.log(err)
    // })
  }
}
