import { Injectable } from '@angular/core';
import { BaseService } from './Base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService {
  // private URL = `${this.JSON_URL}/products`;
  private URL = `${this.BASE_URL}/product`;

  constructor(http: HttpClient) { super(http) }

  getproducts() {
    return this.http.get(this.URL);
  }
  
  getProductsByCategory(catID:string) {
    return this.http.get(`${this.URL}/category/${catID}`);
  }

  getProductByID(Pid:number) {
    return this.http.get(`${this.URL}/${Pid}`);
  }
}
