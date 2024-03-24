import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private DB_URL = 'http://localhost:3000/categories'
  
  constructor(private http: HttpClient) { }

  getCategory() {
    return this.http.get(this.DB_URL);
  }
}
