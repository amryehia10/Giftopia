import { Injectable } from '@angular/core';
import { BaseService } from './Base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService extends BaseService{
  private URL = `${this.BASE_URL}/wishlist`;
  constructor(http: HttpClient) {
    super(http);
  }

  getUserWishlist(userId: string): Observable<any> {
    return this.http.get(`${this.URL}/${userId}`);
  }

  updateWishlist(wishlistData: any): Observable<any> {
    return this.http.put(`${this.URL}`, wishlistData);
}
}
