import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './Base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  private URL = `${this.BASE_URL}/user`;
  //private URL = "http://localhost:3000/users";

  constructor(http: HttpClient) { super(http) }

  registerUser(userData: any): Observable<Object> {
    return this.http.post(this.URL, userData);
  }

  getAllUsers(): Observable<Object> {
    return this.http.get(this.URL);
  }

  getUserByID(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/${id}`);
  }

  // You can add more methods here as needed
}
