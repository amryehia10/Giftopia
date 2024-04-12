import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './Base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReviewService extends BaseService {
  private URL = `${this.BASE_URL}/review`;

  constructor(http: HttpClient) {
    super(http);
  }

  getReviewsByProductId(productId: string): Observable<Object> {
    return this.http.get(`${this.URL}/product/${productId}`);
  }

  addNewReview(review: any): Observable<Object> {
    return this.http.post(this.URL, review);
  }
}
