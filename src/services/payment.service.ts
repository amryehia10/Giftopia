import { Injectable } from '@angular/core';
import { BaseService } from './Base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseService{
  private URL = `${this.BASE_URL}/paymob/create-order`;
  constructor(http: HttpClient) {
    super(http);
  }

  getPayment(data:any): Observable<any> {
    return this.http.post(this.URL, data);
  }
}
