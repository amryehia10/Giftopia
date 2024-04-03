import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './Base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private URL = `${this.Base_URL}/users`;

  constructor(http: HttpClient) { super(http) }

  registerUser(userData: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/users', userData);
  }

  // You can add more methods here as needed
}
