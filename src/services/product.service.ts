import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './Base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {
  // private URL = `${this.JSON_URL}/products`;
  private URL = `${this.BASE_URL}/product`;

  constructor(http: HttpClient) { super(http) }

  getAllProducts(): Observable<Object> {
    return this.http.get(this.URL);
  }

  getProductsByCategory(catID: string): Observable<Object> {
    return this.http.get(`${this.URL}/category/${catID}`);
  }

  getProductByID(Pid: string): Observable<Object> {
    return this.http.get(`${this.URL}/${Pid}`);
  }

  getNewArrivalProducts(): Observable<object> {
    return this.http.get(`${this.URL}/date/new-arrival`)
  }
}
