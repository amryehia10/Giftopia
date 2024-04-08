import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './Base.service';

@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseService {
    
    private URL = `${this.BASE_URL}/cart`;

    constructor(http: HttpClient) { super(http) }

    getAllAtCartByUserId(userId: string): Observable<any> {
        return this.http.get(`${this.URL}/${userId}`);
    }

    updateCart(cartId: string, cartData: any): Observable<any> {
        return this.http.put(`${this.URL}/${cartId}`, cartData);
    }

    addToCart(userId: string, cartData: any): Observable<any> {
        return this.http.post(`${this.URL}/${userId}`, cartData);
    }
}
