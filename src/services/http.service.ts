import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

interface HttpServiceResponse {
  data: { [key: string]: any } | null;
  error: { [key: string]: any } | null;
  errorRes: HttpErrorResponse | null;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private provider: HttpClient) {}

  private getToken() {
    return localStorage.getItem('token');
  }

  async get(url: string): Promise<HttpServiceResponse> {
    return this.handleRequest(this.provider.get(url));
  }

  async post(url: string, body: any = null): Promise<HttpServiceResponse> {
    return this.handleRequest(this.provider.post(url, body));
  }

  async put(url: string, body: any = null): Promise<HttpServiceResponse> {
    return this.handleRequest(this.provider.put(url, body));
  }

  async delete(url: string): Promise<HttpServiceResponse> {
    return this.handleRequest(this.provider.delete(url));
  }

  private async handleRequest(request: any): Promise<HttpServiceResponse> {
    try {
      const token = this.getToken();

      if (token) {
        const headers = new HttpHeaders({
          Authorization: `${token}`,
        });
        request = request.clone({ headers });
      }

      const data = await lastValueFrom<object>(request);
      return { data, error: null, errorRes: null };
    } catch (error) {
      return {
        data: null,
        errorRes: error as HttpErrorResponse,
        error: (error as HttpErrorResponse).error,
      };
    }
  }
}
