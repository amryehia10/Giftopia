import { Injectable } from '@angular/core';
import { BaseService } from './Base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {
   private  URL = `${this.BASE_URL}/category`
  
  constructor(http: HttpClient) {super(http);}

  getAllCategories() {
    return this.http.get(this.URL);
  }
}
