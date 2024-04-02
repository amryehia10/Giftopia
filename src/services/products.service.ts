import { Injectable } from '@angular/core';
import { BaseService } from './Base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService {
  private URL = `${this.Base_URL}/products`;

  constructor(http: HttpClient) { super(http) }

  getproducts() {
    return this.http.get(this.URL);
  }
  
  getCategoryproducts(catID:string) {
    return this.http.get(`${this.URL}/${catID}`);
  }

  getSingleProduct(Pid:number) {
    return this.http.get(`${this.URL}/${Pid}`);
  }
}
