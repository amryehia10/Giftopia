import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './Base.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseService {
  private URL = `${this.BASE_URL}/contact/`;

  constructor(http: HttpClient) { super(http); }


  getAllTickets() {
    return this.http.get(this.URL);
  }
  getUserTickets(email: string) {
    return this.http.get(`${this.URL}/${email}`);
  }

  deleteTicket(id: string) {
    return this.http.get(`${this.URL}/${id}`);
  }

  addNewTicket(ticket: any) {
    console.log(ticket);
    return this.http.post(this.URL, ticket);
  }
}
