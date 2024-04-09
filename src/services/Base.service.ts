import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiEndpoint } from '../config.json';
import { Observable } from 'rxjs';

export abstract class BaseService {
  protected BASE_URL = apiEndpoint;

  constructor(protected http: HttpClient) {
    const token = this.getCurrentToken();
    if (token) {
      this.overrideMethods(token);
    }
  }

  private overrideMethods(token: string | null) {
    const methodsToOverride = ['get', 'post', 'put', 'delete'];
    methodsToOverride.forEach((method) => {
      const originalMethod = (this.http as any)[method];
      (this.http as any)[method] = (...args: any[]): Observable<any> => {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', `${token}`);
        args[1] = { ...args[1], headers: headers };
        return originalMethod.apply(this.http, args);
      };
    });
  }

  private getCurrentToken(): string | null {
    return localStorage.getItem('token');
  }
}
