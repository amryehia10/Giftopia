import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './Base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseService {
  private URL = `${this.BASE_URL}/contact`;

  constructor(http: HttpClient) { super(http); }


  getAllTickets(): Observable<Object> {
    return this.http.get(this.URL);
  }
  getUserTickets(email: string): Observable<Object> {
    return this.http.get(`${this.URL}/${email}`);
  }

  deleteTicket(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/${id}`);
  }

  addNewTicket(ticket: any): Observable<Object> {
    console.log(ticket);
    return this.http.post(this.URL, ticket);
  }
}
