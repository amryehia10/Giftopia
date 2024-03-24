import { Injectable } from '@angular/core';
import { BaseService } from './Base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {
   private  URL = `${this.Base_URL}/categories`
  
  constructor(http: HttpClient) {super(http);}

  getCategory() {
    return this.http.get(this.URL);
  }
}
