import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './Base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  private URL = `${this.BASE_URL}/user`;
  constructor(http: HttpClient) { super(http) }

  getAllUsers(): Observable<Object> {
    return this.http.get(this.URL);
  }

  getUserByID(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/${id}`);
  }

}
