import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private DB_URL = 'http://localhost:3000/products';
  
  constructor(private http:HttpClient) { }

  getproducts() {
    return this.http.get(this.DB_URL);
  }
}
