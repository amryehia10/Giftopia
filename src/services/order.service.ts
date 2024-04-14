import { Injectable } from '@angular/core';
import { BaseService } from './Base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService{
  private URL = `${this.BASE_URL}/order`;

  constructor(http: HttpClient) { 
    super(http);
  }

  addNewOrder(order:any):Observable<any> {
    return this.http.post(this.URL, order);
  }

  getUserOrders(userId: string):Observable<any> {
    return this.http.get(this.URL + '/' + userId);
  }

  changeOrderStatus(orderId: string, status:string):Observable<any> {
    return this.http.put(this.URL + '/' + orderId, status);
  }
}
